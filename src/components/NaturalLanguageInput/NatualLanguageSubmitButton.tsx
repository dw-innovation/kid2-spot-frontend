import clsx from "clsx";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchImrFromNL } from "@/lib/utils";
import useQueryStore from "@/stores/useQueryStore";

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const NatualLanguageSubmitButton = () => {
  const setImr = useQueryStore((state) => state.setImr);
  const naturalLanguagePrompt = useQueryStore(
    (state) => state.naturalLanguagePrompt
  );
  const [apiStatus, fetchData] = useApiStatus(fetchImrFromNL);

  const handleNLToIMRSubmit = async () => {
    const result = await fetchData(naturalLanguagePrompt);

    if (result) {
      setImr(result.imr);
    } else {
      console.log("no results");
    }
  };

  return (
    <Button
      onClick={handleNLToIMRSubmit}
      className={clsx("block px-2 py-1 w-fit")}
      disabled={apiStatus === "loading"}
    >
      <div className="flex items-center gap-2">
        {apiStatus === "loading" ? (
          <>
            <LoadingSpinner />
            Getting translation
          </>
        ) : (
          <>
            <span className="text-green-600">
              <TriangleIcon size={20} />
            </span>{" "}
            Get IMR
          </>
        )}
      </div>
    </Button>
  );
};

export default NatualLanguageSubmitButton;
