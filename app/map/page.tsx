import { Metadata } from "next";
import React from "react";

import Interface from "@/components/Interface";

export const metadata: Metadata = {
  title: "Spot – Search the world with your words",
};

const Page = () => (
  <main className="flex flex-col h-screen max-h-screen p-2">
    <Interface />
  </main>
);

export default Page;
