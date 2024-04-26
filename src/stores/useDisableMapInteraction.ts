import L from "leaflet";
import { RefObject, useEffect } from "react";

const useDisableMapInteraction = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    L.DomEvent.disableClickPropagation(ref.current);
    L.DomEvent.disableScrollPropagation(ref.current);
  }, [ref]);
};

export default useDisableMapInteraction;
