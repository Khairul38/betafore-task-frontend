"use client";

import Loader from "@/components/common/Loader";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.push("/login");
    }
  }, [router, pathName, authChecked, isLoggedIn]);

  if (!authChecked) return <Loader />;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
