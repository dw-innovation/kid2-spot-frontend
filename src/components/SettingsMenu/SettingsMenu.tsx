import { GearIcon } from "@radix-ui/react-icons";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";

import { Button } from "../ui/button";

const SettingsMenu = () => {
  const tilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);

  const TILES_LAYERS = [
    { label: "Versatiles Vector", value: "vector" },
    { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
    { label: "OSM default", value: "osm" },
  ];

  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);

  const VIEWS: { name: "map" | "data"; label: string }[] = [
    {
      name: "map",
      label: "Map",
    },
    {
      name: "data",
      label: "Data",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          <GearIcon />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">Map style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {TILES_LAYERS.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() =>
              setTilesLayer(value as "osm" | "vector" | "mapTilerHybrid")
            }
            disabled={tilesLayer === value}
          >
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuLabel className="uppercase">View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {VIEWS.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setView(item.name)}
            disabled={view === item.name}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
