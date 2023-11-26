"use client";

import Loader from "@/components/common/Loader";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { clearCart, stateUpdate } from "@/redux/features/cart/cartSlice";
import { paymentSuccess } from "@/redux/features/payment/paymentSlice";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    const localStateData = localStorage.getItem("stateData");
    const localPaymentData = localStorage.getItem("payment");

    if (!isLoggedIn) {
      if (localAuth != null) {
        const auth = JSON.parse(localAuth);
        dispatch(userLoggedIn(auth.accessToken));

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
        setLoading(false);
      } else {
        router.replace("/login");
        setLoading(false);
      }
    }
    setLoading(false);
  }, [dispatch, isLoggedIn, router]);

  if (loading) return <Loader />;

  // useEffect(() => {
  //   if (authChecked && !isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, [router, pathName, authChecked, isLoggedIn]);

  // if (!authChecked) return <Loader />;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
