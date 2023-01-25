import React from "react";
import AddressSearchButton from "./AddressSearchButton";
import AddressSearchInput from "./AddressSearchInput";
import AddressSuggestionsList from "./AddressSuggestionsList";
import { callGeocodeAPI } from "@/lib/utils";
import useSessionStore from "@/stores/useSessionStore";

const AddressSearchBox = () => {
  const toggleShowSuggestions = useSessionStore(
    (state) => state.toggleShowSuggestions
  );
  return (
    <div className="flex flex-col gap-1 justify-end">
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          callGeocodeAPI();
          toggleShowSuggestions(true);
        }}
      >
        <AddressSearchInput />
        <AddressSearchButton />
      </form>
      <AddressSuggestionsList />
    </div>
  );
};

export default AddressSearchBox;
