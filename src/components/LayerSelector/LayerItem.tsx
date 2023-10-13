import L from "leaflet";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

type Props = {
  value: "vector" | "mapTilerHybrid" | "osm";
  name: string;
};

const LayerItem = ({ value, name }: Props) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const currentTilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);

  useEffect(() => {
    if (!triggerRef.current) return;
    L.DomEvent.disableClickPropagation(triggerRef.current);
    L.DomEvent.disableScrollPropagation(triggerRef.current);
  }, []);

  const handleLayerItemClick = (value: "vector" | "mapTilerHybrid" | "osm") => {
    setTilesLayer(value);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "aspect-square bg-red-200 hover:bg-red-400 px-1",
              currentTilesLayer === value &&
                "border-2 border-blue-500 shadow-sm"
            )}
            ref={triggerRef}
            onClick={() => handleLayerItemClick(value)}
          ></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LayerItem;
