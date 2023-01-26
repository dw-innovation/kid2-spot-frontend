import React from "react";

import { callGeocodeAPI } from "@/lib/utils";
import useSessionStore from "@/stores/useSessionStore";

import AddressSearchButton from "./AddressSearchButton";
import AddressSearchInput from "./AddressSearchInput";
import AddressSuggestionsList from "./AddressSuggestionsList";

const AddressSearchBox = () => {
  const toggleShowSuggestions = useSessionStore(
    (state) => state.toggleShowSuggestions
  );
  return (
    <div className="flex flex-col gap-1 justify-end w-[20rem]">
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
