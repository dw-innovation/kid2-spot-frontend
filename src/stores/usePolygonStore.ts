import produce from "immer";
import { create } from "zustand";

import PolygonStoreInterface from "./interfaces/PolygonStore.interface";

const usePolygonStore = create<PolygonStoreInterface>((set) => ({
  polygon: [],
  setPolygon: (polygon: [number, number][]) => {
    set(
      produce((draft) => {
        draft.polygon = polygon;
      })
    );
  },
  clearPolygon: () => {
    set(
      produce((draft) => {
        draft.polygon = [];
      })
    );
  },
  polygonOutsideBBox: false,
  togglePolygonOutsideBBox: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.polygonOutsideBBox =
          typeof state === undefined ? !draft.polygonOutsideBBox : state;
      })
    );
  },
}));

export default usePolygonStore;
