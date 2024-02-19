import { create } from "zustand";

import ErrorStoreInterface from "@/types/stores/ErrorStore.interface";

const useErrorStore = create<ErrorStoreInterface>((set) => ({
  isError: false,
  setIsError: (isError) => set({ isError }),
  message: "",
  setMessage: (message) => set({ message }),
}));

export default useErrorStore;
