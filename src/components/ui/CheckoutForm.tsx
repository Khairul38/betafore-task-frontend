"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { notify } from "../common/Toastify";
import { IUser } from "@/types/globalTypes";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { paymentSuccess } from "@/redux/features/payment/paymentSlice";

const CheckoutForm = ({
  user,
  totalPrice,
}: {
  user: IUser;
  totalPrice: number;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `${auth.accessToken}`,
        },
        body: JSON.stringify({ price: totalPrice }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClientSecret(data.data.clientSecret);
        } else {
          notify("error", data.message);
        }
      });
  }, [totalPrice, auth.accessToken]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      notify("error", error.message as string);
      setProcessing(false);
    } else {
      // console.log(paymentMethod);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              user?.name?.firstName + " " + user?.name?.lastName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (intentError) {
      // notify("error", intentError.message as string);
      setProcessing(false);
    } else {
      notify("success", "Your payment processed successfully");
      setProcessing(false);
      localStorage.removeItem("stateData");
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: (paymentMethod as any).card.last4,
        transaction: paymentIntent.id,
      };
      dispatch(paymentSuccess(payment));
      localStorage.setItem("payment", JSON.stringify({ ...payment }));
      router.push("/success");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        disabled={!stripe || clientSecret.length === 0 || processing}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
      >
        {processing ? (
          <Loader className="my-0" color="text-white" />
        ) : (
          `Pay $${totalPrice}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
