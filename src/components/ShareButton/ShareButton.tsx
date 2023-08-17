import React from "react";

import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const ShareButton = () => {
  const [apiStatus, triggerSaveData] = useApiStatus(() =>
    saveData([
      { name: "useAppStore", getState: useAppStore.getState },
      { name: "useMapStore", getState: useMapStore.getState },
      { name: "useQueryStore", getState: useQueryStore.getState },
      { name: "useStreetViewStore", getState: useStreetViewStore.getState },
    ])
  );

  return (
    <Button
      onClick={() => triggerSaveData()}
      className="flex items-center gap-2"
      variant={"secondary"}
    >
      share session
      {apiStatus === "loading" && <LoadingSpinner />}
    </Button>
  );
};

export default ShareButton;
