import debounce from "lodash/debounce";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  mapContainerRef: React.RefObject<HTMLDivElement> | null;
};

const MapResizeHandler = ({ mapContainerRef }: Props) => {
  const map = useMap();

  useEffect(() => {
    const handleResize = debounce(() => {
      map.invalidateSize();
    }, 200);

    const resizeObserver = new ResizeObserver(handleResize);
    if (mapContainerRef && mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      handleResize.cancel();

      if (mapContainerRef && mapContainerRef.current) {
        resizeObserver.unobserve(mapContainerRef.current);
      }
    };
  }, [map, mapContainerRef]);

  return null;
};

export default MapResizeHandler;
