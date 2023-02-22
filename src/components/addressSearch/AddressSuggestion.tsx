import React from "react";

import useSessionStore from "@/stores/useSessionStore";

const AddressSuggestion = ({ formattedAddress, latitude, longitude }: any) => {
  const setCurrentAddress = useSessionStore((state) => state.setCurrentAddress);
  const setMapCenter = useSessionStore((state) => state.setMapCenter);
  const toggleShowSuggestions = useSessionStore(
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
