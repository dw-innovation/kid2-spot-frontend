import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import React from "react";

const SignOut = () => (
  <Button onClick={() => signOut()}>
    <LockClosedIcon />
    sign out
  </Button>
);

export default SignOut;
