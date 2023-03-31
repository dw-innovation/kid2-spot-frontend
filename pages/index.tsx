import { Allotment } from "allotment";
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
        <Allotment.Pane>
          <DynamicOverpassEditor />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical>
            <Allotment.Pane>
              <DynamicMap />
            </Allotment.Pane>
            {showStreetView && (
              <Allotment.Pane>
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
