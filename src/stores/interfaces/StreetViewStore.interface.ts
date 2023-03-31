export default interface StreetViewStoreInterface {
  showStreetView: boolean;
  toggleStreetView: (newState?: boolean) => void;
  streetViewProvider: "google" | "bing";
}
