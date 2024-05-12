import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { Button } from "../ui/button";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <Button onClick={() => signOut()}>sign out</Button>
      ) : (
        <Button onClick={() => signIn()}>sign in</Button>
      )}
    </div>
  );
};

export default AuthButton;
