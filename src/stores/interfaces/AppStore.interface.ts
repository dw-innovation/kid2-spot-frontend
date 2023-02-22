export default interface AppStoreInterface {
    apiState: "idle" | "loading" | "error";
    setApiState: (state: "idle" | "loading" | "error") => void;
    showSuggestions: boolean;
    toggleShowSuggestions: (state?: boolean) => void;
}
