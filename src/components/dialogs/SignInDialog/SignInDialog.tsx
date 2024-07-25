import { signIn } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";

import Dialog from "../Dialog";

const DIALOG_NAME = "signIn";

const PROVIDERS = [
  {
    id: "github",
    label: "GitHub",
  },
  {
    id: "google",
    label: "Google",
  },
];

const SignInDialogDialog = () => (
  <Dialog dialogName={DIALOG_NAME} showCloseButton={false} preventClose={true}>
    <div className="flex items-center flex-col gap-2">
      <h2 className="font-bold text-xl">Sign in with</h2>
      {PROVIDERS.map((provider) => (
        <Button
          onClick={() => signIn(provider.id)}
          className="w-full"
          key={provider.id}
        >
          {provider.label}
        </Button>
      ))}
    </div>
  </Dialog>
);

export default SignInDialogDialog;
