import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import { saveSession } from "../sessions";

type Props = {
  onSuccessCallbacks?: ((sessionLink: string) => void)[];
};

const useSaveSession = ({ onSuccessCallbacks }: Props) => {
  const mutation = useMutation({
    mutationFn: () =>
      saveSession([
        { name: "useGlobalStore", getState: useGlobalStore.getState },
        { name: "useMapStore", getState: useMapStore.getState },
        { name: "useQueryStore", getState: useQueryStore.getState },
        { name: "useStreetViewStore", getState: useStreetViewStore.getState },
        { name: "useImrStore", getState: useImrStore.getState },
      ]),
    onSuccess: (sessionLink) => {
      if (onSuccessCallbacks) {
        onSuccessCallbacks.forEach((callback) => {
          if (typeof callback === "function") {
            callback(sessionLink);
          }
        });
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error("Error saving session: " + error.message);
      } else {
        toast.error("An unknown error occurred while saving the session");
      }
    },
  });

  return mutation;
};

export default useSaveSession;
