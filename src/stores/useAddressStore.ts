import { create } from "zustand";

import AddressStoreInterface from "@/types/stores/AddressStore.interface";

const useGlobalStore = create<AddressStoreInterface>((set) => ({
  searchAddress: "",
  setSearchAddress: (searchAddress: string) => set({ searchAddress }),

  addressSuggestions: [],
  setAddressSuggestions: (addressSuggestions: any[]) =>
    set({ addressSuggestions }),
  currentAddress: { placeName: "", coordinates: [0, 0] },
  setCurrentAddress: (currentAddress) => set({ currentAddress }),
}));

export default useGlobalStore;
