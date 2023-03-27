import React from "react";

import Header from "@/components/Header";
import DynamicMap from "@/components/map";
import DynamicOverpassEditor from "@/components/OverpassEditor";

const IndexPage = () => (
  <main className="flex flex-col h-screen max-h-screen p-2 bg-slate-700">
    <div className="pb-3">
      <Header />
    </div>
    <div className="grid h-full max-h-full grid-cols-2 gap-2">
      <div className="max-h-full col-span-1 overflow-scroll">
        <DynamicOverpassEditor />
      </div>
      <div className="relative h-full max-h-full col-span-1">
        <DynamicMap />
      </div>
    </div>
  </main>
);

export default IndexPage;
