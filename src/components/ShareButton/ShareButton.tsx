import { Share1Icon } from "@radix-ui/react-icons";
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
    <Button onClick={() => triggerSaveData()} variant={"secondary"}>
      {apiStatus === "loading" ? <LoadingSpinner /> : <Share1Icon />}
      Share Session
    </Button>
  );
};

export default ShareButton;
