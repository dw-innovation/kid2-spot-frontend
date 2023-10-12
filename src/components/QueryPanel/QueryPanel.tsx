import { CaretRightIcon } from "@radix-ui/react-icons";
import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import OSMQuerySubmit from "@/components/OSMQuerySubmit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Prompt from "./Prompt";
import RecognizedEntities from "./RecognizedEntities";
import Relations from "./Relations";
import SearchArea from "./SearchArea";

const QueryPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const springProps = useSpring({
    maxHeight: isOpen ? "500px" : "0px",
    opacity: isOpen ? 1 : 0,
  });

  useEffect(() => {
    if (!panelRef.current) return;
    L.DomEvent.disableClickPropagation(panelRef.current);
    L.DomEvent.disableScrollPropagation(panelRef.current);
  });

  return (
    <div ref={panelRef} className="w-[20rem] flex flex-col gap-2">
      <div className="flex flex-col gap-4 p-2 overflow-hidden bg-white rounded-md shadow-lg cursor-auto">
        <Prompt />
      </div>
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={"outline"}
          className="flex items-center gap-1"
        >
          Search Parameters
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
          className="flex flex-col gap-3 cursor-auto"
        >
          <div className="p-2">
            <SearchArea />
            <RecognizedEntities />
            <Relations />
            <OSMQuerySubmit />
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default QueryPanel;
