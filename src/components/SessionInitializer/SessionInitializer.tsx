"use client";

import { useEffect } from "react";

import { fetchOSMData } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { setResults } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const SessionInitializer = ({ data }: any) => {
  const stores = {
    useMapStore: useMapStore((state) => state.initialize),
    useQueryStore: useQueryStore((state) => state.initialize),
    useStreetViewStore: useStreetViewStore((state) => state.initialize),
    useImrStore: useImrStore((state) => state.initialize),
  };

  Object.entries(stores).forEach(([key, initFn]) => {
    data[key] && initFn(data[key]);
  });

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const [, fetchData] = useApiStatus(fetchOSMData);

  useEffect(() => {
    const handleQuery = async () => {
      toggleDialog("queryOSM");
      const data = await fetchData();
      setResults(data);
      toggleDialog("queryOSM");
    };

    handleQuery();
  }, []);

  return null;
};

export default SessionInitializer;
