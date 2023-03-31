import { Allotment } from "allotment";
import React from "react";

import Header from "@/components/Header";
import DynamicMap from "@/components/map";
import DynamicOverpassEditor from "@/components/OverpassEditor";

const IndexPage = () => {
  return (
    <main className="flex flex-col h-screen max-h-screen p-2 bg-slate-700">
      <div className="pb-3">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane>
          <DynamicOverpassEditor />
        </Allotment.Pane>
        <Allotment.Pane>
          <DynamicMap />
        </Allotment.Pane>
      </Allotment>
    </main>
  );
};

export default IndexPage;
