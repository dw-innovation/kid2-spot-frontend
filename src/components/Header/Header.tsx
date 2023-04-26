import React from "react";

import { saveQueryToFile, saveResultsToFile } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import Button from "../Button";
import QueryAreaSelector from "../QueryAreaSelector";
import Select from "../Select";
import ShareButton from "../ShareButton";
import ViewSwitcher from "../ViewSwitcher";

const Header = () => {
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const geoJSON = useResultsStore((state) => state.geoJSON);

  return (
    <>
      <h1 className="pb-1 text-2xl font-bold text-white">
        KID2 Overpass Turbo Prototype
      </h1>
      <div className="flex gap-2">
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
          <ShareButton />
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
          <ViewSwitcher />
        </div>
      </div>
    </>
  );
};

export default Header;
