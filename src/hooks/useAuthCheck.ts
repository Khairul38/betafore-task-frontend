"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/reduxHooks";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { clearCart, stateUpdate } from "@/redux/features/cart/cartSlice";
import { paymentSuccess } from "@/redux/features/payment/paymentSlice";
import { usePathname, useRouter } from "next/navigation";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    const localStateData = localStorage.getItem("stateData");
    const localPaymentData = localStorage.getItem("payment");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken) {
        dispatch(userLoggedIn(auth.accessToken));
      }
    }
    if (localStateData) {
      const StateData = JSON.parse(localStateData);
      dispatch(stateUpdate(StateData));
    } else {
      dispatch(clearCart());
    }
    if (localPaymentData) {
      const payment = JSON.parse(localPaymentData);
      dispatch(paymentSuccess(payment));
    }
    setAuthChecked(true);
  }, [dispatch, pathName, router]);
  return authChecked;
};

export default useAuthCheck;
