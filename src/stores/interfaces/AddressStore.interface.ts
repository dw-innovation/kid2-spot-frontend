export default interface AddressStoreInterface {
  searchAddress: string;
  setSearchAddress: (searchAddress: string) => void;
  currentAddress: {
    placeName: string;
    coordinates: number[];
  };
  setCurrentAddress: (currentAddress: Object) => void;
  addressSuggestions: any[];
  setAddressSuggestions: (addressSuggestions: any[]) => void;
}
