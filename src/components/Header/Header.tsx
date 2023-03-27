import React from "react";

import { exportMarkers, exportQuery } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

import Button from "../Button";
import OverpassQuerySubmit from "../overpassQuerySubmit";
import QueryAreaSelector from "../QueryAreaSelector";

const Header = () => {
  const clearMarkers = useMapStore((state) => state.clearMarkers);
  const markers = useMapStore((state) => state.markers);
  const toggleTilesServer = useMapStore((state) => state.toggleTilesServer);
  const tilesServer = useMapStore((state) => state.tilesServer);

  return (
    <>
      <h1 className="pb-1 text-2xl font-bold text-white">
        KID2 Overpass Turbo Prototype
      </h1>
      <div className="flex gap-2">
        <OverpassQuerySubmit />
        <QueryAreaSelector />
        <div className="flex justify-end flex-1 gap-2">
          <Button onClick={() => exportQuery()}>export query</Button>
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
          <Button onClick={() => toggleTilesServer()}>
            {tilesServer === "osm" ? "switch to vector" : "switch to OSM"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
