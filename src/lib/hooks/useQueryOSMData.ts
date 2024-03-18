"use client";

import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import { fetchOSMData } from "../apiServices";
import { setResults } from "../utils";
import { JWTSession } from "@/types/next-auth";
import { JWT } from "next-auth/jwt";

type Props = {
  onSuccessCallbacks?: ((sessionLink: string) => void)[];
  onErrorCallbacks?: ((error: Error) => void)[];
  isEnabled: boolean;
  onSettled?: () => void;
};

const useQueryOSMData = ({
  onSuccessCallbacks,
  onErrorCallbacks,
  onSettled,
  isEnabled,
}: Props) => {
  const { data: sessionData } = useSession();

  const session = sessionData as JWTSession;
  const imr = useImrStore((state) => state.imr);
  const setError = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const queryClient = useQueryClient();

  return useQuery(
    ["osmData", imr],
    () => fetchOSMData(imr, (session?.user?.jwt as JWT) || ""),
    {
      onSuccess: (data) => {
        if (data.results.features.length === 0) {
          toggleDialog("error", true);
          setError("noResults");
        } else {
          queryClient.setQueryData("osmData", data);
          setResults(data);
        }
        onSuccessCallbacks &&
          onSuccessCallbacks.forEach((callback) => {
            if (typeof callback === "function") {
              callback(data);
            }
          });
      },
      onError: (error: Error) => {
        setError(error.message);
        toggleDialog("error", true);

        onErrorCallbacks &&
          onErrorCallbacks.forEach((callback) => {
            if (typeof callback === "function") {
              callback(error);
            }
          });
        toggleDialog("inputStepper", false);
      },
      onSettled: onSettled,
      enabled: isEnabled,
      retry: false,
    }
  );
};
export default useQueryOSMData;
