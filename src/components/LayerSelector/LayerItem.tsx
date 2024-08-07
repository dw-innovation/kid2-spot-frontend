import Image from "next/image";
import React from "react";

import OSMIconImage from "@/assets/images/osm.png";
import SatelliteImage from "@/assets/images/satellite.png";
import VectorIconImage from "@/assets/images/vector.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, trackAction } from "@/lib/utils";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";
import useMapStore from "@/stores/useMapStore";

const IMAGES = [
  {
    type: "vector",
    image: VectorIconImage,
    alt: "Vector Map Layer",
  },
  {
    type: "satellite",
    image: SatelliteImage,
    alt: "Satellite Layer",
  },
  {
    type: "osm",
    image: OSMIconImage,
    alt: "OSM Map Layer",
  },
];

type Props = {
  value: "vector" | "satellite" | "osm";
  name: string;
};

const LayerItem = ({ value, name }: Props) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const currentTilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  useDisableMapInteraction(triggerRef);

  const handleLayerItemClick = (value: "vector" | "satellite" | "osm") => {
    trackAction("mapLayer", "switchLayer", value);
    setTilesLayer(value);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={triggerRef}
            onClick={() => handleLayerItemClick(value)}
            className="h-10 aspect-square"
          >
            <Image
              src={
                IMAGES.find((image) => image.type === value)?.image ||
                VectorIconImage
              }
              objectFit="contain"
              className={cn(
                "border-2 shadow-lg rounded-lg",
                currentTilesLayer === value
                  ? "border-primary"
                  : "border-white hover:border-secondary"
              )}
              alt={IMAGES.find((image) => image.type === value)?.alt || ""}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LayerItem;
