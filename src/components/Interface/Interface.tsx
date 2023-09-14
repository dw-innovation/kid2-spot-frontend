"use client";

import { Allotment } from "allotment";
import clsx from "clsx";
import React from "react";

import DynamicMap from "@/components/map";
import DynamicResultsViewer from "@/components/ResultsViewer";
import StreetViewPane from "@/components/StreetViewPane";
import useGlobalStore from "@/stores/useGlobalStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Header from "../Header";

const Interface = () => {
  const view = useGlobalStore((state) => state.view);
  const showStreetView = useStreetViewStore((state) => state.showStreetView);

  return (
    <div className="relative flex flex-col h-full">
      <div className="pb-3">
        <Header />
      </div>

      <Allotment vertical defaultSizes={[1, 1]} className="flex-1">
        <Allotment.Pane className={clsx(showStreetView && "pb-1")}>
          {view === "map" && <DynamicMap />}
          {view === "data" && <DynamicResultsViewer />}
        </Allotment.Pane>
        <Allotment.Pane className="pt-1" visible={showStreetView}>
          {showStreetView && <StreetViewPane />}
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default Interface;
