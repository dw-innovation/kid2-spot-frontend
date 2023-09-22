"use client";

import { useRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import AddressSearchBox from "@/components/addressSearch";
import useMapStore from "@/stores/useMapStore";

import PolygonBuffer from "./CustomSearchArea/CustomSearchAreaBuffer";
import PolygonDrawer from "./CustomSearchArea/CustomSearchAreaDrawer";
import Legend from "./Legend";
import PolygonOutsideAlert from "./mapAlerts/alerts/CustomSearchAreaOutsideAlert";
import ResultsOutsideAlert from "./mapAlerts/alerts/ResultsOutsideAlert";
import MapEvents from "./MapEvents";
import MapKeyEvents from "./MapKeyEvents";
import MapResizeHandler from "./MapResizeHandler";
import GeoJSONResults from "./results/GeoJSONResults";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SearchArea from "./results/SearchArea";
import SettingsPanel from "./SettingsPanel";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const bounds = useMapStore((state) => state.bounds);
  const mapZoom = useMapStore((state) => state.mapZoom);
  const tilesLayer = useMapStore((state) => state.tilesLayer);

  return (
    <>
      <div ref={mapContainerRef} className="w-full h-full">
        <LeafletMapContainer
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
          bounds={bounds}
          zoomControl={false}
        >
          <div className="absolute left-0 top-0 z-[400] mt-2 ml-2">
            <SettingsPanel />
          </div>
          <div className="absolute top-0 right-0 z-[400] mt-2 mr-2 flex flex-col-reverse md:flex-row text-base font-sans gap-2 items-end md:items-start">
            <div className="flex flex-col items-end gap-2">
              <PolygonOutsideAlert />
              <ResultsOutsideAlert />
            </div>
            <AddressSearchBox />
          </div>
          <Legend />
          {tilesLayer === "osm" && (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          )}
          {tilesLayer === "vector" && (
            <VectorTileLayer styleUrl={`/vectorStyles/style.json`} />
          )}
          {tilesLayer === "mapTilerHybrid" && (
            <VectorTileLayer
              styleUrl={`https://api.maptiler.com/maps/hybrid/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
            />
          )}
          <MapResizeHandler mapContainerRef={mapContainerRef} />
          <MapEvents />
          <MapKeyEvents />
          <PolygonDrawer />
          <PolygonBuffer />
          <GeoJSONResults />
          {/* <SearchArea /> */}
        </LeafletMapContainer>
      </div>
    </>
  );
};
export default MapContainer;
