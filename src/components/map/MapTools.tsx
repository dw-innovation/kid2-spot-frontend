import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import PolygonIcon from "@/assets/icons/PolygonIcon";
import useMapStore from "@/stores/useMapStore";

import MapButton from "../MapButton";

const MapTools = () => {
  const map = useMap();
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);
  const polygonMode = useMapStore((state) => state.polygonMode);
  const ref = useRef(null);
  const setToolsRef = useMapStore((state) => state.setToolsRef);

  useEffect(() => {
    if (ref.current) setToolsRef(ref.current);
  }, [ref, setToolsRef]);

  return (
    <div
      className="absolute top-0 left-0 z-50 flex flex-col gap-2 m-2"
      style={{ zIndex: 9999 }}
      ref={ref}
    >
      <MapButton onClick={() => map.zoomIn()}>
        <PlusIcon />
      </MapButton>
      <MapButton onClick={() => map.zoomOut()}>
        <MinusIcon />
      </MapButton>
      <MapButton onClick={() => togglePolygonMode()} isActive={polygonMode}>
        <PolygonIcon size={20} />
      </MapButton>
    </div>
  );
};

export default MapTools;
