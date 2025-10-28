import { create } from "zustand";

import { trackError } from "@/lib/apiServices";
import { saveSessionStores } from "@/lib/hooks/useSaveSession";
import GlobalStoreInterface, {
  Dialog,
  Step,
} from "@/types/stores/GlobalStore.interface";

const resetSteps = (steps: Step[]): Step[] =>
  steps.map((step) => ({
    ...step,
    status: "open",
    error: { isError: false, message: "" },
  }));

const prevStep = (currentStep: number): number =>
  currentStep - 1 > 0 ? currentStep - 1 : currentStep;

const nextStep = (
  currentStep: number,
  steps: Step[]
): Partial<GlobalStoreInterface> => ({
  currentStep: currentStep + 1 < steps.length ? currentStep + 1 : currentStep,
  steps: steps.map((step, i) => {
    if (i === currentStep) {
      return { ...step, status: "completed" };
    }
    return step;
  }),
});

const toggleDialog = (
  dialogs: Dialog[],
  name: string,
  isOpen: boolean | undefined = undefined
): Dialog[] =>
  dialogs.map((dialog) => {
    if (dialog.name === name) {
      return {
        ...dialog,
        isOpen: isOpen !== undefined ? isOpen : !dialog.isOpen,
      };
    }
    return dialog;
  });

const setDialogData = (dialogs: Dialog[], name: string, data: any): Dialog[] =>
  dialogs.map((dialog) =>
    dialog.name === name ? { ...dialog, data } : dialog
  );

const STEPS = [
  "naturalLanguageInput",
  "naturalLanguageTransformation",
  "areaSelector",
  "mapQuery",
];

const DIALOGS = [
  "downloadResults",
  "saveSession",
  "loadSession",
  "spotQuery",
  "error",
  "stepperError",
  "queryOSM",
  "inputStepper",
  "info",
  "entityEditor",
  "signIn",
  "maintenance",
];

const useGlobalStore = create<GlobalStoreInterface>((set) => ({
  currentStep: 0,
  showSuggestions: false,
  steps: STEPS.map((step) => ({
    name: step,
    status: "open",
    error: { isError: false },
  })),
  nextStep: () => set((state) => nextStep(state.currentStep, state.steps)),
  prevStep: () =>
    set((state) => ({
      currentStep: prevStep(state.currentStep),
    })),
  resetSteps: () =>
    set((state) => ({
      currentStep: 0,
      steps: resetSteps(state.steps),
    })),
  view: "map",
  setView: (view: "map" | "data") => set({ view }),
  initialize: (initialData) =>
    set({
      showSuggestions: initialData.showSuggestions,
      view: initialData.view,
    }),
  isStreetViewFullscreen: false,
  toggleStreetViewFullscreen: (isFullScreen) =>
    set((state) => ({
      isStreetViewFullscreen: isFullScreen ?? !state.isStreetViewFullscreen,
    })),
  dialogs: DIALOGS.map((dialog) => ({
    name: dialog,
    isOpen:
      (process.env.NEXT_PUBLIC_MAINTENANCE && dialog === "maintenance") ||
      (!process.env.NEXT_PUBLIC_MAINTENANCE && dialog === "inputStepper"),
  })),
  toggleDialog: (name, isOpen) =>
    set((state) => ({ dialogs: toggleDialog(state.dialogs, name, isOpen) })),
  setDialogData: (name, data) =>
    set((state) => ({ dialogs: setDialogData(state.dialogs, name, data) })),
  isError: false,
  errorType: "",
  setError: async (type) => {
    set({ isError: true, errorType: type });
    const sessionLink = await saveSessionStores();
    await trackError(type, sessionLink);
  },
  clearError: () => set({ isError: false, errorType: "" }),
  youTubeConsent: false,
  toggleYouTubeConsent: () =>
    set((state) => ({ youTubeConsent: !state.youTubeConsent })),
}));

export default useGlobalStore;
