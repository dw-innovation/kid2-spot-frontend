"use client";

import React from "react";

import Header from "@/components/Header";
import DynamicMap from "@/components/map";
import DynamicResultsViewer from "@/components/ResultsViewer";
import StreetViewPane from "@/components/StreetViewPane";
import useGlobalStore from "@/stores/useGlobalStore";

const Interface = () => {
  const view = useGlobalStore((state) => state.view);

  return (
    <div className="relative flex flex-col h-full">
      <div className="pb-3">
        <Header />
      </div>

      {view === "map" && <DynamicMap />}
      {view === "data" && <DynamicResultsViewer />}
      <StreetViewPane />
    </div>
  );
};

export default Interface;
