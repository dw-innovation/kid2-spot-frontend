import L from "leaflet";
import Image from "next/image";
import React, { useEffect } from "react";

import OSMIconImage from "@/assets/images/osm.png";
import SatelliteImage from "@/assets/images/satellite.png";
import VectorIconImage from "@/assets/images/vector.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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

  useEffect(() => {
    if (!triggerRef.current) return;
    L.DomEvent.disableClickPropagation(triggerRef.current);
    L.DomEvent.disableScrollPropagation(triggerRef.current);
  }, []);

  const handleLayerItemClick = (value: "vector" | "satellite" | "osm") => {
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
