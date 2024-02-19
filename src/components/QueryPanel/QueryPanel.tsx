import L from "leaflet";
import React, { useEffect, useRef } from "react";

import PromptInput from "./PromptInput";
import SearchRefinement from "./SearchRefinement";

const QueryPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    L.DomEvent.disableClickPropagation(panelRef.current);
    L.DomEvent.disableScrollPropagation(panelRef.current);
  });

  return (
    <div ref={panelRef} className="w-[20rem] flex flex-col gap-2">
      <div className="flex flex-col gap-4 p-2 overflow-hidden bg-white rounded-md shadow-lg cursor-auto">
        <PromptInput />
      </div>
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg">
        <SearchRefinement />
      </div>
    </div>
  );
};

export default QueryPanel;
