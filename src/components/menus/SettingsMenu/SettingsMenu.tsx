import { GearIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";

const TILES_LAYERS = [
  { label: "Versatiles Vector", value: "vector" },
  { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
  { label: "OSM default", value: "osm" },
];

const VIEWS: { name: "map" | "data"; label: string }[] = [
  { name: "map", label: "Map" },
  { name: "data", label: "Data" },
];

const SettingsMenu = () => {
  const tilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);

  const renderTilesLayers = () =>
    TILES_LAYERS.map(({ label, value }) => (
      <DropdownMenuCheckboxItem
        key={value}
        onCheckedChange={() =>
          setTilesLayer(value as "vector" | "mapTilerHybrid" | "osm")
        }
        checked={tilesLayer === value}
      >
        {label}
      </DropdownMenuCheckboxItem>
    ));

  const renderViews = () =>
    VIEWS.map(({ name, label }) => (
      <DropdownMenuCheckboxItem
        key={name}
        onCheckedChange={() => setView(name)}
        checked={view === name}
      >
        {label}
      </DropdownMenuCheckboxItem>
    ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <GearIcon />
          <span className="hidden md:block">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">Map style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderTilesLayers()}

        <DropdownMenuLabel className="uppercase">View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderViews()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
