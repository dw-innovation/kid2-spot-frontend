"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useMap } from "react-leaflet";

import ControlButton from "./ControlButton";

const MapControls = () => {
  const map = useMap();

  return (
    <div className="flex flex-col">
      <ControlButton
        onClick={() => map.zoomIn()}
        className="rounded-b-none border-b-white border-b-[1px]"
      >
        <PlusIcon />
      </ControlButton>
      <ControlButton onClick={() => map.zoomOut()} className="rounded-t-none">
        <MinusIcon />
      </ControlButton>
    </div>
  );
};

export default MapControls;
