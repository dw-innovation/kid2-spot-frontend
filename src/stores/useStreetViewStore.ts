import produce from "immer";
import { LatLngLiteral } from "leaflet";
import { create } from "zustand";

import StreetViewStoreInterface from "./interfaces/StreetViewStore.interface";

const useStreetViewStore = create<StreetViewStoreInterface>((set) => ({
  showStreetView: false,
  toggleStreetView: (newState?: boolean) => {
    set(
      produce((draft) => {
        draft.showStreetView = newState ?? !draft.showStreetView;
      })
    );
  },
  streetViewProvider: "google",
  streetViewCoordinates: { lat: 0, lng: 0 },
  setStreetViewCoordinates: (streetViewCoordinates: LatLngLiteral) => {
    set(
      produce((draft) => {
        draft.streetViewCoordinates = streetViewCoordinates;
      })
    );
  },
}));

export default useStreetViewStore;
