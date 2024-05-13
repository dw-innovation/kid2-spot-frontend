import { useSession } from "next-auth/react";
import React from "react";

import SignOut from "./AuthNav/SignOut";
import SignIn from "./AuthNav/SignIn";

const AuthNavBar = () => {
  const { data: session } = useSession();

  return <div>{session ? <SignOut /> : <SignIn />}</div>;
};

export default AuthNavBar;
