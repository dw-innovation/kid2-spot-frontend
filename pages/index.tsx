import React from "react";
import useSessionStore from "src/stores/useSessionStore";

import DynamicMap from "@/components/map";
import OverpassQueryInput from "@/components/overpassQueryInput";
import OverpassQuerySubmit from "@/components/overpassQuerySubmit";
import { exportMarkers } from "@/lib/utils";

const IndexPage = () => {
  const clearMarkers = useSessionStore((state) => state.clearMarkers);
  const markers = useSessionStore((state) => state.markers);
  const toggleTilesServer = useSessionStore((state) => state.toggleTilesServer);
  const tilesServer = useSessionStore((state) => state.tilesServer);
  return (
    <main className="max-h-screen h-screen bg-slate-700 p-2 flex flex-col">
      <div className="pb-3">
        <h1 className="text-2xl font-bold text-white pb-1">
          KID2 Overpass Turbo Prototype
        </h1>
        <div className="flex gap-2">
          <OverpassQuerySubmit />
          <div className="flex flex-1 justify-end gap-2">
            <button
              className="block px-2 py-1 bg-slate-100 hover:bg-slate-300"
              onClick={() => exportQuery()}
            >
              export query
            </button>
            <button
              onClick={() => clearMarkers()}
              className="block px-2 py-1 bg-slate-100 hover:bg-slate-300"
              disabled={markers.length === 0}
            >
              clear markers
            </button>
            <button
              onClick={() => exportMarkers()}
              className="block px-2 py-1 bg-slate-100 hover:bg-slate-300"
              disabled={markers.length === 0}
            >
              export markers
            </button>
            <button
              onClick={() => toggleTilesServer()}
              className="block px-2 py-1 bg-slate-100 hover:bg-slate-300"
            >
              {tilesServer === "osm" ? "switch to vector" : "switch to OSM"}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 h-full max-h-full">
        <div className="col-span-1 overflow-scroll max-h-full">
          <OverpassQueryInput />
        </div>
        <div className="col-span-1 max-h-full h-full relative">
          <DynamicMap />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
