import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => <Button onClick={() => signIn()}>sign in</Button>;

export default SignIn;
