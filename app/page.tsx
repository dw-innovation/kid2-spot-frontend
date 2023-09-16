import { Metadata } from "next";
import React from "react";

import Dialogs from "@/components/dialogs";
import Div100vh from "@/components/Div100vh";
import InputStepper from "@/components/InputStepper";
import { StringProvider } from "@/lib/contexts/useStrings";

export const metadata: Metadata = {
  title: "Spot – Search the world with your words",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

const Page = () => (
  <StringProvider>
    <Div100vh>
      <InputStepper />
      <Dialogs />
    </Div100vh>
  </StringProvider>
);

export default Page;
