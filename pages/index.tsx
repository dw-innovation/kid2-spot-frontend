import { Allotment } from "allotment";
import clsx from "clsx";
import React from "react";

import Header from "@/components/Header";
import DynamicMap from "@/components/map";
import DynamicOverpassEditor from "@/components/OverpassEditor";
import StreetViewPane from "@/components/StreetViewPane";
import useStreetViewStore from "@/stores/useStreetViewStore";

const IndexPage = () => {
  const showStreetView = useStreetViewStore((state) => state.showStreetView);

  return (
    <main className="flex flex-col h-screen max-h-screen p-2 bg-slate-700">
      <div className="pb-3">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane className="pr-1">
          <DynamicOverpassEditor />
        </Allotment.Pane>
        <Allotment.Pane className="pl-1">
          <Allotment vertical>
            <Allotment.Pane className={clsx(showStreetView && "pb-1")}>
              <DynamicMap />
            </Allotment.Pane>
            {showStreetView && (
              <Allotment.Pane className="pt-1">
                <StreetViewPane />
              </Allotment.Pane>
            )}
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </main>
  );
};

export default IndexPage;
