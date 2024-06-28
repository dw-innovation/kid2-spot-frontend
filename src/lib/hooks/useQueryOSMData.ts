import { useEffect, useRef } from "react";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import { fetchOSMData } from "../apiServices";
import { setResults } from "../utils";

type Props = {
  onSuccessCallbacks?: ((data: OSMData) => void)[];
  onErrorCallbacks?: ((error: Error) => void)[];
  isEnabled: boolean;
  onSettled?: () => void;
};

type OSMData = {
  results: {
    features: Array<any>;
  };
};

const useQueryOSMData = ({
  onSuccessCallbacks,
  onErrorCallbacks,
  onSettled,
  isEnabled,
}: Props) => {
  const imr = useImrStore((state) => state.imr);
  const setError = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["osmData", JSON.stringify(imr)];

  const queryResult = useQuery<OSMData, Error>({
    queryKey,
    queryFn: () => fetchOSMData({ imr }),
    enabled: isEnabled,
    retry: false,
  });

  const { data, error, isSuccess, isError } = queryResult;

  const previousIMR = useRef(imr);
  useEffect(() => {
    if (JSON.stringify(previousIMR.current) !== JSON.stringify(imr)) {
      previousIMR.current = imr;
    }
  }, [imr]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.results.features.length === 0) {
        toggleDialog("error", true);
        setError("noResults");
      } else {
        queryClient.setQueryData(queryKey, data);
        setResults(data);
      }

      if (onSuccessCallbacks) {
        onSuccessCallbacks.forEach((callback) => {
          if (typeof callback === "function") {
            callback(data);
          }
        });
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      setError(error.message);
      toggleDialog("error", true);

      if (onErrorCallbacks) {
        onErrorCallbacks.forEach((callback) => {
          if (typeof callback === "function") {
            callback(error);
          }
        });
      }
      toggleDialog("inputStepper", false);
    }
  }, [isError, error]);

  useEffect(() => {
    if ((isSuccess || isError) && onSettled) {
      onSettled();
    }
  }, [isSuccess, isError]);

  return queryResult;
};

export default useQueryOSMData;
