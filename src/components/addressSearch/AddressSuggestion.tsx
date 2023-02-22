import React from "react";

import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";

const AddressSuggestion = ({ formattedAddress, latitude, longitude }: any) => {
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  const setMapCenter = useMapStore((state) => state.setMapCenter);
  const toggleShowSuggestions = useAppStore(
    (state) => state.toggleShowSuggestions
  );

  return (
    <button
      onClick={() => {
        setMapCenter({ lat: latitude, lng: longitude });
        setCurrentAddress(formattedAddress);
        toggleShowSuggestions(false);
      }}
      className="w-full p-2 text-left hover:bg-blue-200"
    >
      {formattedAddress}
    </button>
  );
};

export default AddressSuggestion;
