import { LatLngLiteral } from "leaflet";
import { create } from "zustand";

import StreetViewStoreInterface from "@/types/stores/StreetViewStore.interface";

const useStreetViewStore = create<StreetViewStoreInterface>((set) => ({
  showStreetView: false,
  toggleStreetView: (newState?: boolean) =>
    set((state) => ({
      showStreetView: newState || !state.showStreetView,
    })),
  streetViewProvider: "google",
  streetViewCoordinates: { lat: 0, lng: 0 },
  setStreetViewCoordinates: (streetViewCoordinates: LatLngLiteral) =>
    set({ streetViewCoordinates }),
  initialize: (initialData: {
    showStreetView: boolean;
    streetViewProvider: "google" | "bing";
    streetViewCoordinates: LatLngLiteral;
  }) =>
    set({
      showStreetView: initialData.showStreetView,
      streetViewProvider: initialData.streetViewProvider,
      streetViewCoordinates: initialData.streetViewCoordinates,
    }),
}));

export default useStreetViewStore;
