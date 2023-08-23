import { Metadata } from "next";
import React from "react";

import Div100vh from "@/components/Div100vh";
import Interface from "@/components/Interface";

export const metadata: Metadata = {
  title: "Spot – Search the world with your words",
};

const Page = () => (
  <Div100vh>
    <Interface />
  </Div100vh>
);

export default Page;
