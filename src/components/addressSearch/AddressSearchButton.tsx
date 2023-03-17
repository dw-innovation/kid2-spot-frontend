import React from "react";

import LensIcon from "@/assets/icons/LensIcon";
import { callGeocodeAPI } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";

const AddressSearchButton = () => {
  const toggleShowSuggestions = useAppStore(
    (state) => state.toggleShowSuggestions
  );
  return (
    <button
      onClick={() => {
        callGeocodeAPI();
        toggleShowSuggestions(true);
      }}
      className="h-full p-3 bg-blue-400 hover:bg-blue-500"
      type="submit"
    >
      <LensIcon />
    </button>
  );
};

export default AddressSearchButton;
