"use client";

import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  if (accessToken && user) {
    router.push("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
