"use client";

import { ExitIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { Button } from "../ui/button";

const AuthBar = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <Button onClick={() => signOut()} className="flex gap-2">
          <ExitIcon /> Logout
        </Button>
      ) : (
        <>
          <Button onClick={() => signIn()} className="flex gap-2">
            <LockClosedIcon /> Login
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthBar;
