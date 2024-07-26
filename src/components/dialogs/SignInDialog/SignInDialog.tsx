import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";

import SpotLogo from "@/assets/icons/SpotLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className="flex flex-col items-start w-full gap-2 mb-4">
          <SpotLogo />
          <h2 className="pb-1 font-semibold leading-none text-center text-md font-inter text-muted-foreground ">
            Geospatial search for OpenStreetMap
          </h2>
        </div>
        {PROVIDERS.map((provider) => (
          <Button
            onClick={() => signIn(provider.id)}
            className="w-full"
            key={provider.id}
            variant={"secondary"}
          >
            Sign in with {provider.label}
          </Button>
        ))}
        <div className="flex items-center justify-center my-6 w-full">
          <div className="flex-grow border-t border-[1px] border-gray-300"></div>
          <span className="mx-4 text-gray-500 font-bold">or</span>
          <div className="flex-grow border-t border-[1px] border-gray-300"></div>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <Label className="text-gray-500 font-bold">Username</Label>
            <Input
              name="username"
              placeholder="kid2"
              onChange={handleUserNameChange}
              value={userName}
            />

            <Label className="text-gray-500 font-bold">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="kid2"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>

          <Button type="submit">Sign in with Credentials</Button>
        </form>
      </div>
    </Dialog>
  );
};

export default SignInDialog;
