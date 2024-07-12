"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useMap } from "react-leaflet";

import ZoomControl from "../ZoomControl";
import ControlButton from "./ControlButton";

const MapControls = () => {
  const map = useMap();

  return (
    <div className="flex flex-col w-fit">
      <ControlButton onClick={() => map.zoomOut()} className="rounded-b-none">
        <MinusIcon />
      </ControlButton>

      <ZoomControl />

      <ControlButton onClick={() => map.zoomIn()} className="rounded-t-none">
        <PlusIcon />
      </ControlButton>
    </div>
  );
};

export default MapControls;
