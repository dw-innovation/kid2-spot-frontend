import { transformBbox } from "@/lib/utils";
import { use, useEffect } from "react";
import { useMap } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";

const MapEvents = () => {
  const setBbox = useSessionStore((state) => state.setBbox);

  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    setBbox(transformBbox(map.getBounds()));

    map.on("moveend", () => {
      // @ts-ignore
      setBbox(transformBbox(map.getBounds()));
    });

    return () => {
      map.off("moveend");
    };
  }, [map, setBbox]);

  return <></>;
};
export default MapEvents;
