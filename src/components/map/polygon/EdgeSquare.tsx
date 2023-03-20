import L from "leaflet";
import React, { useCallback, useMemo } from "react";
import { Marker } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

const EdgeSquare = ({
  position,
  index,
}: {
  position: [number, number];
  index: number;
}) => {
  const updatePolygonPoint = useMapStore((state) => state.updatePolygonPoint);

  const icon = L.divIcon({
    className: "edge-square-icon",
    html: `<div style="width: 10px; height: 10px; background-color: rgba(255, 255, 255, 0.8); border: 1px grey solid;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  const onDragEnd = useCallback(
    (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      updatePolygonPoint(index, [lat, lng]);
    },
    [updatePolygonPoint, index]
  );

  const onDrag = useCallback(
    (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      updatePolygonPoint(index, [lat, lng]);
    },
    [updatePolygonPoint, index]
  );

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        onDragEnd(e);
      },
    }),
    [onDrag, onDragEnd]
  );

  return (
    <Marker
      position={position}
      icon={icon}
      zIndexOffset={1000}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  );
};

export default EdgeSquare;
