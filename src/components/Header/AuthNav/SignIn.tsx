import { LockOpen1Icon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";

const SignIn = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <Button
      onClick={() => {
        toggleDialog("signIn", true);
      }}
    >
      <LockOpen1Icon />
      Sign in
    </Button>
  );
};

export default SignIn;
