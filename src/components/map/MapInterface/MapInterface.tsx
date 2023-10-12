import React from "react";

import AddressSearchBox from "@/components/addressSearch";
import Footer from "@/components/Footer";
import Legend from "@/components/map/Legend";
import PolygonOutsideAlert from "@/components/map/mapAlerts/alerts/CustomSearchAreaOutsideAlert";
import ResultsOutsideAlert from "@/components/map/mapAlerts/alerts/ResultsOutsideAlert";
import QueryPanel from "@/components/QueryPanel";

const MapInterface = () => (
  <div className="absolute top-0 left-0 z-[400] w-full h-full p-2 flex flex-col justify-between !font-sans">
    <div className="flex items-start justify-between w-full">
      <QueryPanel />

      <div className="flex flex-col-reverse items-end gap-2 font-sans text-base md:flex-row md:items-start">
        <div className="flex flex-col items-end gap-2">
          <PolygonOutsideAlert />
          <ResultsOutsideAlert />
        </div>
        <AddressSearchBox />
      </div>
    </div>

    <div className="flex items-start justify-between w-full">
      <div>
        <Legend />
      </div>

      <Footer />
    </div>
  </div>
);

export default MapInterface;
