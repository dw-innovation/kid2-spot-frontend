import { LatLngLiteral } from "leaflet";
import { create } from "zustand";

import StreetViewStoreInterface from "@/types/stores/StreetViewStore.interface";

const useStreetViewStore = create<StreetViewStoreInterface>((set) => ({
  showStreetView: false,
  toggleStreetView: (newState) =>
    set((state) => ({
      showStreetView: newState || !state.showStreetView,
    })),
  streetViewProvider: "google",
  streetViewCoordinates: { lat: 0, lng: 0 },
  setStreetViewCoordinates: (streetViewCoordinates: LatLngLiteral) =>
    set({ streetViewCoordinates }),
  initialize: (initialData) =>
    set({
      showStreetView: initialData.showStreetView,
      streetViewProvider: initialData.streetViewProvider,
      streetViewCoordinates: initialData.streetViewCoordinates,
    }),
}));

export default useStreetViewStore;
