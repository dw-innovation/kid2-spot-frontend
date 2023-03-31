import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  mapContainerRef: React.RefObject<HTMLDivElement> | null;
};

const MapResizeHandler = ({ mapContainerRef }: Props) => {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (mapContainerRef && mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef && mapContainerRef.current) {
        resizeObserver.unobserve(mapContainerRef.current);
      }
    };
  }, [map, mapContainerRef]);

  return null;
};

export default MapResizeHandler;
