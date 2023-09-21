import produce from "immer";
import { create } from "zustand";

import ErrorStoreInterface from "../types/stores/ErrorStore.interface";

const useErrorStore = create<ErrorStoreInterface>((set) => ({
  isError: false,
  setIsError: (isError: boolean) => {
    set(
      produce((draft) => {
        draft.isError = isError;
      })
    );
  },
  message: "",
  setMessage: (message: string) => {
    set(
      produce((draft) => {
        draft.message = message;
      })
    );
  },
}));

export default useErrorStore;
