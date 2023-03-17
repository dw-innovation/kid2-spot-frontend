import debounce from "lodash/debounce"; // Import the debounce function
import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

import { callGeocodeAPI } from "@/lib/utils";
import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";

const AddressSearchInput = () => {
  const searchAddress = useAddressStore((state) => state.searchAddress);
  const setSearchAddress = useAddressStore((state) => state.setSearchAddress);
  const currentAddress = useAddressStore((state) => state.currentAddress);
  const toggleShowSuggestions = useAppStore(
    (state) => state.toggleShowSuggestions
  );

  const debouncedAPICall = debounce(() => {
    callGeocodeAPI();
  }, 300);

  useSWRImmutable([searchAddress], () => {
    debouncedAPICall();
  });

  useEffect(() => {
    setSearchAddress(currentAddress.placeName);
  }, [currentAddress, setSearchAddress]);

  return (
    <input
      className="flex-1 w-64 px-2 py-1 border-2 border-blue-400"
      value={searchAddress}
      onChange={({ target: { value } }) => {
        setSearchAddress(value);
        toggleShowSuggestions(true);
      }}
    />
  );
};

export default AddressSearchInput;
