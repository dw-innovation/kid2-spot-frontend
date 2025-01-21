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
        url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
        attribution='© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
    )}
  </>
);

export default TileLayer;
