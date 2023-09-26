import { CaretRightIcon } from "@radix-ui/react-icons";
import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import OSMQuerySubmit from "@/components/OSMQuerySubmit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div className="flex flex-col gap-4 p-2 overflow-hidden bg-white rounded-md shadow-lg cursor-auto">
        <InitialPrompt />
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={"outline"}
        className="flex items-center gap-1"
      >
        Filters{" "}
        <div
          className={cn(
            isOpen ? "rotate-90" : "",
            "transition-all duration-100 ease-in-out"
          )}
        >
          <CaretRightIcon />
        </div>
      </Button>
      <animated.div
        style={springProps}
        className="flex flex-col gap-4 p-2 overflow-hidden bg-white rounded-md shadow-lg cursor-auto"
      >
        <SearchArea />
        <RecognizedEntities />
        <Relations />
        <OSMQuerySubmit />
      </animated.div>
    </div>
  );
};

export default SettingsPanel;
