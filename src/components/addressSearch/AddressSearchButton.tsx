import React from "react";

import Lens from "@/assets/icons/lens";
import { callGeocodeAPI } from "@/lib/utils";
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
      className="h-full p-3 bg-blue-400 hover:bg-blue-500"
      type="submit"
    >
      <Lens />
    </button>
  );
};

export default AddressSearchButton;
