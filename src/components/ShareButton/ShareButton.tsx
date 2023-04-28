import React from "react";

import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";

const ShareButton = () => {
  const [apiStatus, triggerSaveData] = useApiStatus(() =>
    saveData([
      { name: "useAppStore", getState: useAppStore.getState },
      { name: "useMapStore", getState: useMapStore.getState },
      { name: "useQueryStore", getState: useQueryStore.getState },
    ])
  );

  return (
    <Button
      onClick={() => triggerSaveData()}
      className="flex items-center gap-2"
    >
      share session
      {apiStatus === "loading" && <LoadingSpinner />}
    </Button>
  );
};

export default ShareButton;
