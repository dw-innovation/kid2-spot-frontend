export default interface AppStoreInterface {
  view: "map" | "data";
  setView: (view: "map" | "data") => void;
  initialize: (initialData: {
    showSuggestions: boolean;
    view: "map" | "data";
  }) => void;
  isStreetViewFullscreen: boolean;
  toggleStreetViewFullscreen: (state?: boolean) => void;
}
