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
import useImrStore from "@/stores/useImrStore";
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

const SEARCH_AREAS = [
  { label: "Current Map View", value: "bbox" },
  { label: "Custom Area", value: "area" },
  { label: "Drawn Polygon", value: "polygon" },
];

const SettingsMenu = () => {
  const tilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);
  const searchAreaType = useImrStore((state) => state.imr.a.t);
  const setSearchArea = useImrStore((state) => state.setSearchArea);
  const bounds = useMapStore((state) => state.bounds);

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

  const renderSearchArea = () =>
    SEARCH_AREAS.map(({ label, value }) => (
      <DropdownMenuCheckboxItem
        key={value}
        checked={searchAreaType === value}
        onCheckedChange={() => setSearchArea(value, bounds)}
      >
        {label}
      </DropdownMenuCheckboxItem>
    ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <GearIcon />
          <span>Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">Search Area</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderSearchArea()}
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
