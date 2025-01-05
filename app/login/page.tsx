"use client";
import { Suspense } from "react";
import LoginCom from "@/components/global/user/Login";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCom />
    </Suspense>
  );
};

export default page;
