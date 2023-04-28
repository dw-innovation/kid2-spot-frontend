export default interface AppStoreInterface {
  showSuggestions: boolean;
  toggleShowSuggestions: (state?: boolean) => void;
  view: "map" | "data";
  setView: (view: "map" | "data") => void;
  initialize: (initialData: {
    showSuggestions: boolean;
    view: "map" | "data";
  }) => void;
}
