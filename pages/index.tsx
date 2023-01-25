import React from "react";
import useSessionStore from "src/stores/useSessionStore";
import OverpassQueryInput from "@/components/overpassQueryInput";
import OverpassQuerySubmit from "@/components/overpassQuerySubmit";
import DynamicMap from "@/components/map";

const IndexPage = () => {
  const bbox = useSessionStore((state) => state.bbox);
  const markers = useSessionStore((state) => state.markers);
  return (
    <main className="max-h-screen h-screen bg-slate-700 p-2 flex flex-col">
      <div className="pb-3">
        <h1 className="text-2xl font-bold text-white pb-1">
          KID2 Overpass Turbo Prototype
        </h1>
        <OverpassQuerySubmit />
      </div>
      <div className="grid grid-cols-2 gap-2 h-full max-h-full">
        <div className="col-span-1 overflow-scroll max-h-full">
          <OverpassQueryInput />
        </div>
        <div className="col-span-1 max-h-full h-full">
          <DynamicMap />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
