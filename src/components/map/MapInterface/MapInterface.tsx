import React from "react";

import AddressSearchBox from "@/components/addressSearch";
import Footer from "@/components/Footer";
import LayerSelector from "@/components/LayerSelector";
import PolygonOutsideAlert from "@/components/map/mapAlerts/alerts/CustomSearchAreaOutsideAlert";
import ResultsOutsideAlert from "@/components/map/mapAlerts/alerts/ResultsOutsideAlert";
import MapControls from "@/components/map/MapControls";
import MapLegend from "@/components/map/MapLegend";
import QueryPanel from "@/components/QueryPanel";
import SearchCurrentViewButton from "@/components/SearchCurrentViewButton";

const MapInterface = () => (
  <>
    <div className="absolute top-0 left-0 z-[400] flex items-start justify-between !font-sans p-2">
      <QueryPanel />
    </div>

    <div className="absolute top-0 left-0 z-[400] flex items-center justify-center w-full p-2">
      <SearchCurrentViewButton />
    </div>

    <div className="absolute top-0 right-0 z-[400] flex items-start justify-between !font-sans p-2 w-fit">
      <div className="flex flex-col-reverse items-end gap-2 font-sans text-base">
        <div className="flex flex-col items-end gap-2">
          <PolygonOutsideAlert />
          <ResultsOutsideAlert />
        </div>
        <AddressSearchBox />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 z-[400] flex items-end gap-2 justify-between p-2">
      <MapLegend />
      <MapControls />
      <LayerSelector />
    </div>

    <div className="absolute bottom-0 right-0 z-[400] p-2">
      <Footer />
    </div>
  </>
);

export default MapInterface;
