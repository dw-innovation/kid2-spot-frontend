"use client";

import React from "react";

import ZoomControl from "./ZoomControl";

const MapControls = () => {
  return (
    <div className="flex flex-col w-[10rem]">
      <ZoomControl />
    </div>
  );
};

export default MapControls;
