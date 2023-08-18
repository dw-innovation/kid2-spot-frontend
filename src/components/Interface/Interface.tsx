"use client";

import { Allotment } from "allotment";
import clsx from "clsx";
import React from "react";

import DynamicImrEditor from "@/components/ImrEditor";
import DynamicMap from "@/components/map";
import NaturalLanguageInput from "@/components/NaturalLanguageInput";
import NatualLanguageSubmitButton from "@/components/NaturalLanguageInput/NatualLanguageSubmitButton";
import OSMQuerySubmit from "@/components/OSMQuerySubmit";
import QueryAreaSelector from "@/components/QueryAreaSelector";
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
        <Allotment.Pane className="pr-1">
          <Allotment vertical>
            <Allotment.Pane className="pb-2">
              <div className="flex flex-col h-full gap-1">
                <NaturalLanguageInput />
                <NatualLanguageSubmitButton />
              </div>
            </Allotment.Pane>
            <Allotment.Pane>
              <div className="flex flex-col h-full gap-1">
                <div className="flex-1">
                  <DynamicImrEditor />
                </div>
                <div className="flex flex-col gap-2">
                  <QueryAreaSelector />
                  <div className="flex gap-2">
                    <OSMQuerySubmit />
                  </div>
                </div>
              </div>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>

        <Allotment.Pane className="pl-1">
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
