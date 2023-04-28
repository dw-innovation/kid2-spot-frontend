import { LatLngLiteral } from "leaflet";

export default interface StreetViewStoreInterface {
  showStreetView: boolean;
  toggleStreetView: (newState?: boolean) => void;
  streetViewProvider: "google" | "bing";
  streetViewCoordinates: LatLngLiteral;
  setStreetViewCoordinates: (streetViewCoordinates: LatLngLiteral) => void;
  initialize: (initialData: {
    showStreetView: boolean;
    streetViewProvider: "google" | "bing";
    streetViewCoordinates: LatLngLiteral;
  }) => void;
}
