import React from "react";
import { TileLayer as LeafletTileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

type Props = {
  layerType: "vector" | "satellite" | "osm";
};

const TileLayer = ({ layerType }: Props) => (
  <>
    {layerType === "osm" && (
      <LeafletTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    )}

    {layerType === "vector" && (
      <VectorTileLayer styleUrl={`/vectorStyles/style.json`} />
    )}

    {layerType === "satellite" && (
      <LeafletTileLayer
        url={`https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_TOMTOM_KEY}`}
        attribution='© <a href="https://www.tomtom.com/">TomTom</a>'
        maxZoom={20}
        minZoom={0}
      />
    )}
  </>
);

export default TileLayer;
