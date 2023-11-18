"use client";

import Loader from "@/components/common/Loader";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(authChecked, isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if ( !isLoading) return <Loader />;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
