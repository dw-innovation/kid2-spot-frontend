"use client";

import { useRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import AddressSearchBox from "@/components/addressSearch";
import useMapStore from "@/stores/useMapStore";

import PolygonBuffer from "./CustomSearchArea/CustomSearchAreaBuffer";
import PolygonDrawer from "./CustomSearchArea/CustomSearchAreaDrawer";
import PolygonOutsideAlert from "./CustomSearchArea/CustomSearchAreaOutsideAlert";
import MapEvents from "./MapEvents";
import MapKeyEvents from "./MapKeyEvents";
import MapResizeHandler from "./MapResizeHandler";
import GeoJSONResults from "./results/GeoJSONResults";
import ResultsOutsideAlert from "./results/ResultsOutsideAlert";

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
          className="w-full h-full cursor-crosshair"
          bounds={bounds}
        >
          <div className="absolute top-0 right-0 z-[9999] mt-2 mr-2 flex text-base font-sans items-start">
            <div className="flex flex-col gap-2">
              <PolygonOutsideAlert />
              <ResultsOutsideAlert />
            </div>
            <AddressSearchBox />
          </div>
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
        </LeafletMapContainer>
      </div>
    </>
  );
};
export default MapContainer;
