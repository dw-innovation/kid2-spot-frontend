"use client";

import { Allotment } from "allotment";
import clsx from "clsx";
import React from "react";

import DynamicMap from "@/components/map";
import DynamicResultsViewer from "@/components/ResultsViewer";
import StreetViewPane from "@/components/StreetViewPane";
import useAppStore from "@/stores/useAppStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Header from "../Header";

const Interface = () => {
  const view = useAppStore((state) => state.view);
  const showStreetView = useStreetViewStore((state) => state.showStreetView);

  return (
    <>
      <div className="pb-3">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane>
          <Allotment vertical>
            <Allotment.Pane className={clsx(showStreetView && "pb-1")}>
              {view === "map" && <DynamicMap />}
              {view === "data" && <DynamicResultsViewer />}
            </Allotment.Pane>
            <Allotment.Pane
              className="pt-1"
              visible={showStreetView}
              minSize={20}
            >
              {showStreetView && <StreetViewPane />}
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </>
  );
};

export default Interface;
