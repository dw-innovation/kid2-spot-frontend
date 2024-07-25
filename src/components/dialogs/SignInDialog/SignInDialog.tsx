import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Dialog from "../Dialog";

const DIALOG_NAME = "signIn";

interface Provider {
  id: string;
  label: string;
}

const PROVIDERS: Provider[] = [
  {
    id: "github",
    label: "GitHub",
  },
];

const SignInDialog: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signIn("credentials", {
      redirect: true,
      username: userName,
      password: password,
    });
  };

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      showCloseButton={false}
      preventClose={true}
    >
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
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col gap-2"
        >
          <Input
            name="username"
            placeholder="Username"
            onChange={handleUserNameChange}
            value={userName}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
          <Button type="submit">Sign in with credentials</Button>
        </form>
      </div>
    </Dialog>
  );
};

export default SignInDialog;
