import React from "react";
import useSessionStore from "@/stores/useSessionStore";

const AddressSuggestion = ({ formattedAddress, latitude, longitude }: any) => {
  const setCurrentAddress = useSessionStore((state) => state.setCurrentAddress);
  const setMapCenter = useSessionStore((state) => state.setMapCenter);
  const toggleShowSuggestions = useSessionStore(state=>state.toggleShowSuggestions)

  return (
    <button
      onClick={() => {
        setMapCenter([latitude, longitude]);
        setCurrentAddress(formattedAddress);
        toggleShowSuggestions(false);
      }}
      className="hover:bg-blue-200 p-2 w-full text-left"
    >
      {formattedAddress}
    </button>
  );
};

export default AddressSuggestion;
