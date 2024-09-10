import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";

import useGlobalStore from "@/stores/useGlobalStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";

import { fetchOSMData } from "../apiServices";
import { setResults } from "../utils";

type Props = {
  onSuccessCallbacks?: ((data: OSMData) => void)[];
  onErrorCallbacks?: ((error: AxiosError) => void)[];
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
}: Props) => {
  const spotQuery = useSpotQueryStore((state) => state.spotQuery);
  const setError = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["osmData"];

  const queryResult = useQuery<OSMData, AxiosError>({
    queryKey,
    queryFn: () => fetchOSMData({ spotQuery }),
    enabled: false,
    retry: false,
  });

  const { data, error, isSuccess, isError } = queryResult;

  const previousSpotQuery = useRef(spotQuery);
  useEffect(() => {
    if (
      JSON.stringify(previousSpotQuery.current) !== JSON.stringify(spotQuery)
    ) {
      previousSpotQuery.current = spotQuery;
    }
  }, [spotQuery]);

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
      // @ts-ignore
      setError(error.response.data.message || "");
      toggleDialog("stepperError", true);

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
