import React from "react";
import { callGeocodeAPI } from "@/lib/utils";
import Lens from "@/assets/icons/lens";
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
      <Lens />
    </button>
  );
};

export default AddressSearchButton;
