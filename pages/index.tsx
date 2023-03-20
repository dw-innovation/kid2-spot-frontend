import React from "react";

import Button from "@/components/Button";
import DynamicMap from "@/components/map";
import OverpassQueryInput from "@/components/overpassQueryInput";
import OverpassQuerySubmit from "@/components/overpassQuerySubmit";
import QueryAreaSelector from "@/components/QueryAreaSelector";
import { exportMarkers, exportQuery } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

const IndexPage = () => {
  const clearMarkers = useMapStore((state) => state.clearMarkers);
  const markers = useMapStore((state) => state.markers);
  const toggleTilesServer = useMapStore((state) => state.toggleTilesServer);
  const tilesServer = useMapStore((state) => state.tilesServer);

  return (
    <main className="flex flex-col h-screen max-h-screen p-2 bg-slate-700">
      <div className="pb-3">
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
      </div>
      <div className="grid h-full max-h-full grid-cols-2 gap-2">
        <div className="max-h-full col-span-1 overflow-scroll">
          <OverpassQueryInput />
        </div>
        <div className="relative h-full max-h-full col-span-1">
          <DynamicMap />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
