import React from "react";
import { MapContainer as LeafletMapContainer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

const MapContainer = () => {
  return (
    <LeafletMapContainer scrollWheelZoom={true} className="w-full h-full">
      <VectorTileLayer styleUrl={`/vectorStyles/style.json`} />
    </LeafletMapContainer>
  );
};

export default MapContainer;
