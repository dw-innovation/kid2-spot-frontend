import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const useMapZoom = () => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const onZoom = () => {
      setZoom(map.getZoom());
    };

    map.on("zoomend", onZoom);

    return () => {
      map.off("zoomend", onZoom);
    };
  }, [map]);

  return zoom;
};

export default useMapZoom;
