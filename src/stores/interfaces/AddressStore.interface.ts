export default interface AddressStoreInterface {
  searchAddress: string;
  setSearchAddress: (searchAddress: string) => void;
  currentAddress: Object;
  setCurrentAddress: (currentAddress: Object) => void;
  addressSuggestions: any[];
  setAddressSuggestions: (addressSuggestions: any[]) => void;
}
