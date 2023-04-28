import React from "react";
import { RotatingLines } from "react-loader-spinner";

import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

import Button from "../Button";

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
      {apiStatus === "loading" && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      )}
    </Button>
  );
};

export default ShareButton;
