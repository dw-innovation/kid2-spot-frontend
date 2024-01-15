import { create } from "zustand";

import ErrorStoreInterface from "@/types/stores/ErrorStore.interface";

const useErrorStore = create<ErrorStoreInterface>((set) => ({
  isError: false,
  setIsError: (isError: boolean) => set({ isError }),
  message: "",
  setMessage: (message: string) => set({ message }),
}));

export default useErrorStore;
