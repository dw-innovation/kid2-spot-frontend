import { LockOpen1Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";

const LoginButton = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <Button
      onClick={() => {
        toggleDialog("error", false);
        toggleDialog("signIn", true);
      }}
    >
      <LockOpen1Icon />
      Sign in
    </Button>
  );
};

export default LoginButton;
