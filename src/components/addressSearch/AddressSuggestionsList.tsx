import React, { Fragment } from "react";
import useSessionStore from "@/stores/useSessionStore";
import AddressSuggestion from "./AddressSuggestion";
import clsx from "clsx";

const AddressSuggestionsList = () => {
  const addressSuggestions = useSessionStore(
    (state) => state.addressSuggestions
  );

  const showSuggestions = useSessionStore((state) => state.showSuggestions);
  
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
