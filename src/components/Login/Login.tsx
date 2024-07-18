"use client";

import { LockOpen1Icon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";

import SpotLogo from "@/assets/icons/SpotLogo";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center text-center">
        <SpotLogo width={120} />
        <p className="text-xl">Search OpenStreetMap with your words.</p>
        <Button onClick={() => signIn()} className="text-xl w-full">
          <LockOpen1Icon />
          log in to SPOT
        </Button>
      </div>
    </div>
  );
};

export default Login;
