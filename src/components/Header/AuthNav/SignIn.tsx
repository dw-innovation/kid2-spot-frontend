import { LockOpen1Icon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";

const SignIn = () => {
  return (
    <Button onClick={() => signIn()}>
      <LockOpen1Icon />
      sign in
    </Button>
  );
};

export default SignIn;
