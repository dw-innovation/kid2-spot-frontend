import React from "react";

import { saveData } from "@/lib/storeData";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useAppStore from "@/stores/useQueryStore";

import Button from "../Button";

const ShareButton = () => (
  <Button
    onClick={() =>
      saveData([
        { name: "useAppStore", getState: useAppStore.getState },
        { name: "useMapStore", getState: useMapStore.getState },
        { name: "useQueryStore", getState: useQueryStore.getState },
      ])
    }
  >
    share session
  </Button>
);

export default ShareButton;
