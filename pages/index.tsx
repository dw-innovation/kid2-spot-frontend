import { Allotment } from "allotment";
import clsx from "clsx";
import React from "react";

import Header from "@/components/Header";
import DynamicJsonEditor from "@/components/JSONEditor";
import JsonToOverpassSubmit from "@/components/JsonToOverpassSubmit/JsonToOverpassSubmit";
import DynamicMap from "@/components/map";
import DynamicOverpassEditor from "@/components/OverpassEditor";
import OverpassQuerySubmit from "@/components/OverpassQuerySubmit";
import QueryAreaSelector from "@/components/QueryAreaSelector";
import DynamicResultsEditor from "@/components/ResultsEditor";
import StreetViewPane from "@/components/StreetViewPane";
import useAppStore from "@/stores/useAppStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const IndexPage = () => {
  const view = useAppStore((state) => state.view);
  const showStreetView = useStreetViewStore((state) => state.showStreetView);

  return (
    <main className="flex flex-col h-screen max-h-screen p-2 bg-slate-700">
      <div className="pb-3">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane className="pr-1">
          <Allotment vertical>
            <Allotment.Pane className="pb-2">
              <div className="flex flex-col h-full gap-1">
                <DynamicJsonEditor />
                <JsonToOverpassSubmit />
              </div>
            </Allotment.Pane>
            <Allotment.Pane>
              <div className="flex flex-col h-full gap-1">
                <div className="flex-1">
                  <DynamicOverpassEditor />
                </div>
                <div className="flex flex-col gap-2">
                  <QueryAreaSelector />
                  <OverpassQuerySubmit />
                </div>
              </div>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>

        <Allotment.Pane className="pl-1">
          <Allotment vertical>
            <Allotment.Pane className={clsx(showStreetView && "pb-1")}>
              {view === "map" && <DynamicMap />}
              {view === "data" && <DynamicResultsEditor />}
            </Allotment.Pane>
            <Allotment.Pane
              className="pt-1"
              visible={showStreetView}
              minSize={20}
            >
              <StreetViewPane />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </main>
  );
};

export default IndexPage;
