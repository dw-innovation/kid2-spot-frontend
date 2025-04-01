import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useGlobalStore from "@/stores/useGlobalStore";
import useMapStore from "@/stores/useMapStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import { saveSession } from "../sessions";
import useSaveSession from "./useSaveSession";

type Props = {
  onSuccessCallbacks?: ((sessionLink: string) => void)[];
};

const useSubmitFeedback = ({ onSuccessCallbacks }: Props) => {
  const mutuseSaveSession;
};

export default useSubmitFeedback;
