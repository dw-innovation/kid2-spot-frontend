import { Metadata } from "next";
import React from "react";

import InputStepper from "@/components/InputStepper";

export const metadata: Metadata = {
  title: "Spot – Search the world with your words",
};

const Page = () => (
  <main className="flex flex-col h-screen max-h-screen p-2">
    <InputStepper />
  </main>
);

export default Page;
