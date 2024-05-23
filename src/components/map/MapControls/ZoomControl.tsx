import { Slider } from "@/components/ui/slider";
import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import ControlButton from "./ControlButton";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { MAX_ZOOM } from "@/lib/const/const";

const ZoomControl = () => {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState<number>(0);

  const handleZoomChange = (zoomLevel: number) => {
    map.setZoom(zoomLevel);
  };

  useEffect(() => {
    const onZoom = () => {
      setCurrentZoom(map.getZoom());
    };

    map.on("zoomend", onZoom);

    return () => {
      map.off("zoomend", onZoom);
    };
  }, []);

  return (
    <div className="flex flex-row gap-2">
      <ControlButton
        onClick={() => {
          if (currentZoom > 0) {
            map.zoomOut();
          }
        }}
        className="border-b-white"
      >
        <MinusIcon />
      </ControlButton>

      <Slider
        defaultValue={[currentZoom]}
        value={[currentZoom]}
        min={0}
        max={MAX_ZOOM}
        step={0.25}
        onValueChange={(value) => handleZoomChange(value[0])}
      />

      <ControlButton
        onClick={() => {
          if (currentZoom < MAX_ZOOM) {
            map.zoomIn();
          }
        }}
        className="border-b-white"
      >
        <PlusIcon />
      </ControlButton>
    </div>
  );
};

export default ZoomControl;
