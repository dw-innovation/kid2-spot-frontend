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

    if (mapContainerRef && mapContainerRef.current) {
      const currentRef = mapContainerRef.current;
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(currentRef);

      return () => {
        handleResize.cancel();
        resizeObserver.unobserve(currentRef);
      };
    }

    return undefined;
  }, [map, mapContainerRef]);

  return null;
};

export default MapResizeHandler;
