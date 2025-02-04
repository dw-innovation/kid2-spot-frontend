"use client";

import { useRef } from "react";
import { MapContainer as LeafletMapContainer } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

import MapEvents from "./MapEvents";
import MapInterface from "./MapInterface";
import MapKeyEvents from "./MapKeyEvents";
import MapResizeHandler from "./MapResizeHandler";
import GeoJSONResults from "./results/GeoJSONResults";
import SearchArea from "./results/SearchArea";
import TileLayer from "./TileLayer";

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
          attributionControl={false}
        >
          <MapInterface />
          <TileLayer layerType={tilesLayer} />
          <MapResizeHandler mapContainerRef={mapContainerRef} />
          <MapEvents />
          <MapKeyEvents />
          <GeoJSONResults />
          <SearchArea />
        </LeafletMapContainer>
      </div>
    </>
  );
};
export default MapContainer;
