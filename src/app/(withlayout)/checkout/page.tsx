"use client";

import Loader from "@/components/common/Loader";
import { notify } from "@/components/common/Toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import CheckoutForm from "@/components/ui/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_PAYMENT_STRIPE_PK}`
);

const Checkout = () => {
  const router = useRouter();
  const { cartProducts, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state: { auth: any }) => state.auth);

  return (
    <div className="flex justify-center align-middle items-center h-[80vh] px-8">
      <div className="p-5 sm:p-14 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center mb-10">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Checkout Form
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white">
              Enter your card details below
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user?.name?.firstName + " " + user?.name?.lastName}
              readOnly
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user?.email}
              readOnly
            />
          </div>

          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm user={user} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
