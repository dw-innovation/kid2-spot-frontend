import { LockOpen1Icon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";

const SignIn = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <Button onClick={() => toggleDialog("signIn")}>
      <LockOpen1Icon />
      sign in
    </Button>
  );
};

export default SignIn;
