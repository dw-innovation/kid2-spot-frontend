import React from "react";
import Map from "@/components/map";
import useSessionStore from "src/stores/useSessionStore";
import OverpassQueryInput from "@/components/overpassQueryInput";

const IndexPage = () => {
  const bbox = useSessionStore((state) => state.bbox);
  const results = useSessionStore((state) => state.results);
  return (
    <main className="max-h-screen">
      <h1>KID2 Overpass Turbo Prototype</h1>
      <div className="grid grid-cols-2 h-full">
        <div className="col-span-1 overflow-scroll">
          <h2>Input</h2>
          <OverpassQueryInput />
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
        <div className="col-span-1">
          <h2>Map</h2>
          Bounding Box: {JSON.stringify(bbox)}
          <Map />

        </div>
      </div>
    </main>
  );
};

export default IndexPage;
