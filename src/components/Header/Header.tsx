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
      <h1 className="pb-1 text-2xl font-bold">KID2 X Protoype</h1>
      <div className="flex gap-2">
        <div className="flex justify-between flex-1">
          <div className="flex gap-2">
            <ShareButton />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => clearGeoJSON()}
              disabled={geoJSON ? false : true}
            >
              clear results
            </Button>
            <Button
              onClick={() => saveResultsToFile()}
              disabled={geoJSON ? false : true}
            >
              export results
            </Button>
            <Select
              options={[
                { label: "Versatiles Vector", value: "vector" },
                { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
                { label: "OSM default", value: "osm" },
              ]}
              value={tilesLayer}
              onSelect={({ target: { value } }) =>
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
