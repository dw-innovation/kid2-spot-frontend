import { Metadata } from "next";
import React from "react";

import StartScreenInterfaceSwitch from "@/components/StartScreenInterfaceSwitch";

export const metadata: Metadata = {
  title: "Spot – Geospatial Search OSM data",
};

const Page = () => (
  <main className="flex flex-col h-screen max-h-screen p-2">
    <StartScreenInterfaceSwitch />
  </main>
);

export default Page;
