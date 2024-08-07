import { useSession } from "next-auth/react";
import React from "react";

import SignIn from "./AuthNav/SignIn";
import SignOut from "./AuthNav/SignOut";

const AuthNavBar = () => {
  const { data: session } = useSession();

  return <div>{session ? <SignOut /> : <SignIn />}</div>;
};

export default AuthNavBar;
