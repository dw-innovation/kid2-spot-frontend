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
import { useStrings } from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

const SettingsMenu = () => {
  const {
    settingsMenuTrigger,
    settingsMenuSearchAreaTitle,
    settingsMenuMapStyleTitle,
    settingsMenuCustomArea,
    settingsMenuVersatiles,
    settingsMenuSearchBbox,
    settingsMenuView,
    settingsMenuMap,
    settingsMenuData,
  } = useStrings();

  const SEARCH_AREAS = [
    { label: settingsMenuSearchBbox(), value: "bbox" },
    { label: settingsMenuCustomArea(), value: "area" },
  ];

  const VIEWS: { value: "map" | "data"; label: string }[] = [
    { label: settingsMenuMap(), value: "map" },
    { label: settingsMenuData(), value: "data" },
  ];

  const TILES_LAYERS = [
    { label: settingsMenuVersatiles(), value: "vector" },
    { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
    { label: "OSM default", value: "osm" },
  ];

  const tilesLayer = useMapStore((state) => state.tilesLayer);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const view = useGlobalStore((state) => state.view);
  const setView = useGlobalStore((state) => state.setView);
  const searchAreaType = useImrStore((state) => state.imr.area.type);
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
    VIEWS.map(({ value, label }) => (
      <DropdownMenuCheckboxItem
        key={value}
        onCheckedChange={() => setView(value)}
        checked={view === value}
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
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <GearIcon />
          <span>{settingsMenuTrigger()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">
          {settingsMenuSearchAreaTitle()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderSearchArea()}
        <DropdownMenuLabel className="uppercase">
          {settingsMenuMapStyleTitle()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderTilesLayers()}

        <DropdownMenuLabel className="uppercase">
          {settingsMenuView()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderViews()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
