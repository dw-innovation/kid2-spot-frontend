"use client";

import React from "react";
import { useMap } from "react-leaflet";

import ZoomControl from "./ZoomControl";

const MapControls = () => {
  const map = useMap();

  return (
    <div className="flex flex-col w-[10rem]">
      <ZoomControl />
    </div>
  );
};

export default MapControls;
