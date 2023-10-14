import produce from "immer";
import { create } from "zustand";

import GlobalStoreInterface, {
  Step,
} from "@/types/stores/GlobalStore.interface";

const useGlobalStore = create<GlobalStoreInterface>((set) => ({
  currentStep: 0,
  steps: [
    {
      name: "naturalLanguageInput",
      status: "open",
      error: { isError: false },
    },
    {
      name: "naturalLanguageAnalyzer",
      status: "open",
      error: { isError: false },
    },
    {
      name: "areaSelector",
      status: "open",
      error: { isError: false },
    },
    {
      name: "mapQuery",
      status: "open",
      error: { isError: false },
    },
  ],
  nextStep: () => {
    set(
      produce((draft) => {
        if (draft.currentStep + 1 < draft.steps.length) {
          draft.steps[draft.currentStep].status = "completed";
          draft.currentStep += 1;
        }
      })
    );
  },
  prevStep: () => {
    set(
      produce((draft) => {
        if (draft.currentStep - 1 > 0) draft.currentStep -= 1;
      })
    );
  },
  resetSteps: () => {
    set(
      produce((draft) => {
        draft.steps.forEach((step: Step) => {
          step.status = "open";
          step.error = { isError: false, message: "" };
        });
        draft.currentStep = 0;
      })
    );
  },
  view: "map",
  setView: (view: "map" | "data") => {
    set(
      produce((draft) => {
        draft.view = view;
      })
    );
  },
  initialize: (initialData: {
    showSuggestions: boolean;
    view: "map" | "data";
  }) => {
    set(
      produce((draft) => {
        draft.showSuggestions = initialData.showSuggestions;
        draft.view = initialData.view;
      })
    );
  },
  isStreetViewFullscreen: false,
  toggleStreetViewFullscreen: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.isStreetViewFullscreen =
          typeof state === "undefined" ? !draft.isStreetViewFullscreen : state;
      })
    );
  },
  dialogs: [
    { name: "downloadResults", isOpen: false },
    { name: "saveSession", isOpen: false },
    { name: "loadSession", isOpen: false },
    { name: "imr", isOpen: false },
    { name: "error", isOpen: false },
    { name: "stepperError", isOpen: false },
    { name: "queryOSM", isOpen: false },
    { name: "inputStepper", isOpen: true },
    { name: "info", isOpen: false },
    { name: "entityFilters", isOpen: false },
  ],
  toggleDialog: (name: string, state: boolean | undefined = undefined) => {
    set(
      produce((draft) => {
        const dialog = draft.dialogs.find(
          (dialog: { name: string }) => dialog.name === name
        );
        if (dialog) {
          dialog.isOpen = state !== undefined ? state : !dialog.isOpen;
        }
      })
    );
  },
  isError: false,
  errorType: "",
  setError: (message: string) => {
    set(
      produce((draft) => {
        draft.isError = true;
        draft.errorType = message;
      })
    );
  },
  clearError: () => {
    set(
      produce((draft) => {
        draft.isError = false;
        draft.errorType = "";
      })
    );
  },
}));

export default useGlobalStore;
