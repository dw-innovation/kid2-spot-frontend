import React from "react";

import { exportMarkers, saveQueryToFile } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

import Button from "../Button";
import OverpassQuerySubmit from "../overpassQuerySubmit";
import QueryAreaSelector from "../QueryAreaSelector";
import Select from "../Select";

const Header = () => {
  const clearMarkers = useMapStore((state) => state.clearMarkers);
  const setTilesLayer = useMapStore((state) => state.setTilesLayer);
  const markers = useMapStore((state) => state.markers);

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
            onClick={() => clearMarkers()}
            disabled={markers.length === 0}
          >
            clear markers
          </Button>
          <Button
            onClick={() => exportMarkers()}
            disabled={markers.length === 0}
          >
            export markers
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
