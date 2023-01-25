import React from "react";
import { callGeocodeAPI } from "@/lib/utils";
import LensIcon from "src/assets/icons/lens";
import useSessionStore from "@/stores/useSessionStore";

const AddressSearchButton = () => {
  const toggleShowSuggestions = useSessionStore(
    (state) => state.toggleShowSuggestions
  );
  return (
    <button
      onClick={() => {
        callGeocodeAPI();
        toggleShowSuggestions(true);
      }}
      className="bg-blue-400 hover:bg-blue-500 h-full p-3"
      type="submit"
    >
      <LensIcon />
    </button>
  );
};

export default AddressSearchButton;
