"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useMap } from "react-leaflet";

import ZoomControl from "../ZoomControl";
import ControlButton from "./ControlButton";

const MapControls = () => {
  const map = useMap();

  if (!map) {
    return null;
  }

  return (
    <div className="flex flex-col w-fit">
      <ControlButton
        onClick={() => map.getZoom() > 0 && map.zoomOut()}
        className="rounded-b-none"
      >
        <MinusIcon />
      </ControlButton>

      <ZoomControl />

      <ControlButton
        onClick={() => map.getZoom() < 19 && map.zoomIn()}
        className="rounded-t-none"
      >
        <PlusIcon />
      </ControlButton>
    </div>
  );
};

export default MapControls;
