import { LockClosedIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";

const SignOut = () => (
  <Button onClick={() => signOut()}>
    <LockClosedIcon />
    Sign out
  </Button>
);

export default SignOut;
