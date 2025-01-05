"use client";
import { Suspense } from "react";
import RegisterCom from "../../components/global/user/RegisterCom";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterCom />
    </Suspense>
  );
};

export default page;
