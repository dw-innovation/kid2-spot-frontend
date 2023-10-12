"use client";

import React from "react";
import { MapContainer as LeafletMapContainer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import useMapStore from "@/stores/useMapStore";

const MapContainer = () => {
  const bounds = useMapStore((state) => state.bounds);

  return (
    <LeafletMapContainer
      scrollWheelZoom={true}
      className="w-full h-full"
      bounds={bounds}
    >
      <VectorTileLayer styleUrl={`/vectorStyles/style.json`} />
    </LeafletMapContainer>
  );
};

export default MapContainer;
