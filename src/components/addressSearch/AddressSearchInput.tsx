import React, { useEffect } from "react";

import useSessionStore from "@/stores/useSessionStore";

const AddressSearchInput = () => {
  const searchAddress = useSessionStore((state) => state.searchAddress);
  const setSearchAddress = useSessionStore((state) => state.setSearchAddress);
  const currentAddress = useSessionStore((state) => state.currentAddress);

  useEffect(() => {
    // @ts-ignore
    setSearchAddress(currentAddress.formattedAddress);
  }, [currentAddress, setSearchAddress]);

  return (
    <input
      className="flex-1 w-64 px-2 py-1 border-2 border-blue-400"
      value={searchAddress}
      onChange={({ target: { value } }) => setSearchAddress(value)}
    />
  );
};

export default AddressSearchInput;
