import produce from "immer";
import { create } from "zustand";

import AppStoreInterface, { Step } from "./interfaces/AppStore.interface";

const useAppStore = create<AppStoreInterface>((set) => ({
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
  isStartScreenVisible: true,
  toggleStartScreen: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.isStartScreenVisible =
          typeof state === "undefined" ? !draft.isStartScreenVisible : state;
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
}));

export default useAppStore;
