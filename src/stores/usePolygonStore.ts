import produce from "immer";
import { create } from "zustand";

import PolygonStoreInterface from "./interfaces/PolygonStore.interface";

const usePolygonStore = create<PolygonStoreInterface>((set) => ({
  polygon: [],
  addPolygonPoint: (point: number[]) => {
    set(
      produce((draft) => {
        draft.polygon.push(point);
      })
    );
  },
  removePolygonPoint: (point: number[]) => {
    set(
      produce((draft) => {
        draft.polygon = draft.polygon.filter((p: number[]) => p !== point);
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
  updatePolygonPoint: (index: number, newLatLng: [number, number]) =>
    set((state) => {
      const newPolygon = [...state.polygon];
      newPolygon[index] = newLatLng;
      return { polygon: newPolygon };
    }),
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
