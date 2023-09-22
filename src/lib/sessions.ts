import axios from "axios";
import { toast } from "react-toastify";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import { fetchOSMData } from "./apiServices";
import { setResults } from "./utils";

export const saveSession = async (
  stores: { name: string; getState: () => Record<string, any> }[]
) => {
  const combinedStoreData: Record<string, any> = {};

  for (const store of stores) {
    const state = store.getState();
    const storeData: Record<string, any> = {};

    for (const key in state) {
      if (typeof state[key] !== "function") {
        storeData[key] = state[key];
      }
    }

    combinedStoreData[store.name] = storeData;
  }

  try {
    const response = await axios.post("/api/saveSession", {
      data: combinedStoreData,
    });
    navigator.clipboard.writeText(
      `${window.location.origin}/map/${response.data.id}`
    );
    toast.success("Share link copied to clipboard!");
  } catch (error) {
    toast.error("Error saving data");
  }
};

export const loadSession = async (sessionData: Record<string, any>) => {
  let toggleDialog = useGlobalStore.getState().toggleDialog;

  let stores = {
    useMapStore: useMapStore.getState().initialize,
    useQueryStore: useQueryStore.getState().initialize,
    useStreetViewStore: useStreetViewStore.getState().initialize,
    useImrStore: useImrStore.getState().initialize,
  };

  Object.entries(stores).forEach(([key, initFn]) => {
    sessionData[key] && initFn(sessionData[key]);
  });

  toggleDialog("queryOSM");
  toggleDialog("loadSession", false);

  await fetchOSMData({}).then((data) => {
    if (data) {
      setResults(data);
      toggleDialog("queryOSM", false);
    }
  });
};
