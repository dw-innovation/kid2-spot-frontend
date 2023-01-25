import React from "react";
import Map from "@/components/map";
import useSessionStore from "src/stores/useSessionStore";
import OverpassQueryInput from "@/components/overpassQueryInput";
import OverpassQuerySubmit from "@/components/overpassQuerySubmit";

const IndexPage = () => {
  const bbox = useSessionStore((state) => state.bbox);
  const markers = useSessionStore((state) => state.markers);
  return (
    <main className="max-h-screen bg-slate-700 p-2">
      <div className=" pb-3">
        <h1 className="text-2xl font-bold text-white pb-1">
          KID2 Overpass Turbo Prototype
        </h1>
        <OverpassQuerySubmit />
      </div>
      <div className="grid grid-cols-2 h-full">
        <div className="col-span-1 overflow-scroll max-h-full">
          <OverpassQueryInput />
          <pre className="overflow-scroll h-full">{JSON.stringify(markers, null, 2)}</pre>
        </div>
        <div className="col-span-1  max-h-full">
          <Map />
          Bounding Box: {JSON.stringify(bbox)}
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
