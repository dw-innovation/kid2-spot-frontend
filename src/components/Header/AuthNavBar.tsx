"use client";

import { useSession } from "next-auth/react";
import React from "react";

import SignIn from "./AuthNav/SignIn";
import SignOut from "./AuthNav/SignOut";

const AuthNavBar = () => {
  const authSession = useSession();

  return <div>{authSession.data ? <SignOut /> : <SignIn />}</div>;
};

export default AuthNavBar;
