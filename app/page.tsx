import { Metadata } from "next";
import React from "react";

import Header from "@/components/Header";
import Interface from "@/components/Interface";

export const metadata: Metadata = {
  title: "Spot – Geospatial Search OSM data",
};

const Page = () => (
  <main className="flex flex-col h-screen max-h-screen p-2">
    <div className="pb-3">
      <Header />
    </div>
    <Interface />
  </main>
);

export default Page;
