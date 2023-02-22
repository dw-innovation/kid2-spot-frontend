import produce from "immer";
import { create } from "zustand";

import AddressStoreInterface from "./interfaces/AddressStore.interface";

const useAppStore = create<AddressStoreInterface>((set) => ({
  searchAddress: "",
  setSearchAddress: (searchAddress: string) => {
    set(
      produce((draft) => {
        draft.searchAddress = searchAddress;
      })
    );
  },
  addressSuggestions: [],
  setAddressSuggestions: (addressSuggestions: any[]) => {
    set(
      produce((draft) => {
        draft.addressSuggestions = addressSuggestions;
      })
    );
  },
  currentAddress: {},
  setCurrentAddress: (currentAddress: Object) => {
    set(
      produce((draft) => {
        draft.currentAddress = currentAddress;
      })
    );
  },
}));

export default useAppStore;
