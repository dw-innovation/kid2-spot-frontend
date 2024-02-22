import { useQuery } from "react-query";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import { fetchOSMData } from "../apiServices";
import { setResults } from "../utils";

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
  const imr = useImrStore((state) => state.imr);
  const setErrorType = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return useQuery(["osmData", imr], () => fetchOSMData({ imr }), {
    onSuccess: (data) => {
      setResults(data);
      onSuccessCallbacks &&
        onSuccessCallbacks.forEach((callback) => {
          if (typeof callback === "function") {
            callback(data);
          }
        });
    },
    onError: (error: Error) => {
      setErrorType(error.message);
      toggleDialog("error");

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
  });
};
export default useQueryOSMData;
