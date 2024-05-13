import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => <Button onClick={() => signOut()}>sign out</Button>;

export default SignOut;
