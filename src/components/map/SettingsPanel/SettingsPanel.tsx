import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import OSMQuerySubmit from "@/components/OSMQuerySubmit";
import { Button } from "@/components/ui/button";

import InitialPrompt from "./InitialPrompt";
import RecognizedEntities from "./RecognizedEntities";
import Relations from "./Relations";
import SearchArea from "./SearchArea";

const SettingsPanel = () => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const springProps = useSpring({
    maxHeight: isOpen ? "500px" : "0px",
    opacity: isOpen ? 1 : 0,
  });

  useEffect(() => {
    if (!settingsRef.current) return;
    L.DomEvent.disableClickPropagation(settingsRef.current);
    L.DomEvent.disableScrollPropagation(settingsRef.current);
  });

  return (
    <div ref={settingsRef} className="w-[20rem] flex flex-col gap-2">
      <Button onClick={() => setIsOpen(!isOpen)} variant={"outline"}>
        {isOpen ? "Close Settings" : "Show Settings"}
      </Button>

      <animated.div
        className="flex flex-col gap-4 p-2 overflow-hidden bg-white rounded-md shadow-lg cursor-auto"
        style={springProps}
      >
        <InitialPrompt />
        <SearchArea />
        <RecognizedEntities />
        <Relations />
        <OSMQuerySubmit />
      </animated.div>
    </div>
  );
};

export default SettingsPanel;
