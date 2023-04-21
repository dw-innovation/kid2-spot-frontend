import React from "react";

import { saveQueryToFile, saveResultsToFile } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

import Button from "../Button";
import OverpassQuerySubmit from "../overpassQuerySubmit";
import QueryAreaSelector from "../QueryAreaSelector";
import Select from "../Select";

const Header = () => {
  const clearGeoJSON = useMapStore((state) => state.clearGeoJSON);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const geoJSON = useMapStore((state) => state.geoJSON);

  return (
    <>
      <h1 className="pb-1 text-2xl font-bold text-white">
        KID2 Overpass Turbo Prototype
      </h1>
      <div className="flex gap-2">
        <OverpassQuerySubmit />
        <QueryAreaSelector />
        <div className="flex justify-end flex-1 gap-2">
          <Button onClick={() => saveQueryToFile()}>export query</Button>
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
              { label: "Maptiler Vector", value: "mapTilerVector" },
              { label: "Maptiler Hybrid", value: "mapTilerHybrid" },
              { label: "OSM default", value: "osm" },
            ]}
            defaultValue="mapTilerVector"
            onSelect={({ target: { value } }) =>
              setTilesLayer(
                value as "osm" | "mapTilerVector" | "mapTilerHybrid"
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default Header;
