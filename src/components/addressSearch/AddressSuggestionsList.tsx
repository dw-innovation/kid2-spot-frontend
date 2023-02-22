import clsx from "clsx";
import React, { Fragment } from "react";

import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";

import AddressSuggestion from "./AddressSuggestion";

const AddressSuggestionsList = () => {
  const addressSuggestions = useAddressStore(
    (state) => state.addressSuggestions
  );

  const showSuggestions = useAppStore((state) => state.showSuggestions);

  return (
    <div
      className={clsx(
        "bg-white max-w-[20rem] w-[20rem]",
        showSuggestions ? "block" : "hidden"
      )}
    >
      {addressSuggestions.length > 0 && (
        <>
          {addressSuggestions.map((item, index) => (
            <Fragment key={index}>
              <AddressSuggestion {...item} />
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default AddressSuggestionsList;
