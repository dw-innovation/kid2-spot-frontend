import axios from "axios";

import useGlobalStore from "@/stores/useGlobalStore";
import useMapStore from "@/stores/useMapStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import { fetchOSMData } from "./apiServices";
import { setResults } from "./utils";

export const saveSession = async (
  stores: { name: string; getState: () => Record<string, any> }[]
): Promise<string> => {
  const combinedStoreData: Record<string, any> = {};

  for (const store of stores) {
    const state = store.getState();
    const storeData: Record<string, any> = {};

    for (const key in state) {
      if (
        Object.hasOwnProperty.call(state, key) &&
        typeof state[key] !== "function"
      ) {
        storeData[key] = state[key];
      }
    }

    combinedStoreData[store.name] = storeData;
  }

  const response = await axios.post("/api/saveSession", {
    data: combinedStoreData,
  });

  return `${window.location.origin}/${response.data.id}`;
};

export const loadSession = async (sessionData: Record<string, any>) => {
  let toggleDialog = useGlobalStore.getState().toggleDialog;

  let stores = {
    useMapStore: useMapStore.getState().initialize,
    useStreetViewStore: useStreetViewStore.getState().initialize,
    useSpotQueryStore: useSpotQueryStore.getState().initialize,
  };

  Object.entries(stores).forEach(([key, initFn]) => {
    sessionData[key] && initFn(sessionData[key]);
  });

  toggleDialog("inputStepper", false);
  toggleDialog("queryOSM");
  toggleDialog("loadSession", false);

  const spotQuery = useSpotQueryStore.getState().spotQuery;

  await fetchOSMData({ spotQuery }).then((data) => {
    if (data) {
      setResults(data);
      toggleDialog("queryOSM", false);
    }
  });
};
