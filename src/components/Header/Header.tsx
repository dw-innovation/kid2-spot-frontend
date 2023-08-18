"use client";

import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { saveResultsToFile } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import Select from "../Select";
import ShareButton from "../ShareButton";
import { Button } from "../ui/button";
import ViewSwitcher from "../ViewSwitcher";

const Header = () => {
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const tilesLayer = useMapStore((state) => state.tilesLayer);

  return (
    <>
      <div className="flex gap-2">
        <div className="flex items-center justify-between flex-1">
          <h1 className="pb-1 text-2xl font-bold">KID2 Spot Prototype</h1>
          <div className="flex gap-2">
            <ShareButton />
            <Button
              onClick={() => clearGeoJSON()}
              disabled={geoJSON ? false : true}
              variant={"secondary"}
            >
              <TrashIcon />
              Clear Results
            </Button>
            <Button
              onClick={() => saveResultsToFile()}
              disabled={geoJSON ? false : true}
              variant={"secondary"}
            >
              <DownloadIcon />
              Download Results
            </Button>
            <Select
              options={[
                { label: "Versatiles Vector", value: "vector" },
                { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
                { label: "OSM default", value: "osm" },
              ]}
              value={tilesLayer}
              onSelect={(value) =>
                setTilesLayer(value as "osm" | "vector" | "mapTilerHybrid")
              }
            />
            <ViewSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
