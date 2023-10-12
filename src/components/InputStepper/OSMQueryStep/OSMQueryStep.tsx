import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useInputStepper } from "@/components/InputStepper/Context";
import InputContainer from "@/components/InputStepper/InputContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchOSMData } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { setResults } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";

const OSMQueryStep = () => {
  const router = useRouter();
  const { setAnimateOut } = useInputStepper();
  const [, fetchData] = useApiStatus(fetchOSMData);
  const elapsedTime = useElapsedTime(true, "loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setResults(data);
      })
      .then(() => {
        setShouldUnmount(true);
        setAnimateOut(true);
        toggleDialog("inputStepper", false);
      })
      .then(() => setTimeout(() => router.push("/map"), 500));
  }, []);

  return (
    <InputContainer
      title="Querying OpenStreetMap"
      shouldUnmount={shouldUnmount}
    >
      <LoadingSpinner size="2.5rem" />
      {elapsedTime} {elapsedTime === 1 ? `second` : `seconds`}
    </InputContainer>
  );
};

export default OSMQueryStep;
