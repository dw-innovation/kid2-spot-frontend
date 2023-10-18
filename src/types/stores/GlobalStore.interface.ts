export type Step = {
  name: string;
  status: "open" | "loading" | "completed" | "error";
  error: { isError: boolean; message?: string };
};
export default interface GlobalStoreInterface {
  currentStep: 0;
  prevStep: () => void;
  nextStep: () => void;
  steps: Step[];
  resetSteps: () => void;
  view: "map" | "data";
  setView: (view: "map" | "data") => void;
  initialize: (initialData: {
    showSuggestions: boolean;
    view: "map" | "data";
  }) => void;
  isStreetViewFullscreen: boolean;
  toggleStreetViewFullscreen: (state?: boolean) => void;
  dialogs: { name: string; isOpen: boolean; data?: any }[];
  toggleDialog: (name: string, state?: boolean | undefined) => void;
  isError: boolean;
  errorType: string;
  setError: (message: string) => void;
  clearError: () => void;
  setDialogData: (name: string, data: any) => void;
}
