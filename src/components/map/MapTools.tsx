import React from "react";
import { useMap } from "react-leaflet";

import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import PolygonIcon from "@/assets/icons/PolygonIcon";
import PolygonTrashIcon from "@/assets/icons/PolygonTrashIcon";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

import MapButton from "../MapButton";

const MapTools = () => {
  const map = useMap();
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);
  const polygonMode = useMapStore((state) => state.polygonMode);
  const polygon = usePolygonStore((state) => state.polygon);
  const clearPolygon = usePolygonStore((state) => state.clearPolygon);

  return (
    <div
      className="absolute top-0 left-0 z-50 flex flex-col gap-2 m-2"
      style={{ zIndex: 9999 }}
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
      {polygon.length > 0 && (
        <MapButton onClick={() => clearPolygon()}>
          <PolygonTrashIcon size={20} />
        </MapButton>
      )}
    </div>
  );
};

export default MapTools;
