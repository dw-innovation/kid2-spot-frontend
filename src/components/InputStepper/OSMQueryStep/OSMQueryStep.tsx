import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchOSMData } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { setResults } from "@/lib/utils";

import { useInputStepper } from "../Context";
import InputContainer from "../InputContainer";

const OSMQueryStep = () => {
  const router = useRouter();
  const { setAnimateOut } = useInputStepper();
  const [, fetchData] = useApiStatus(fetchOSMData);
  const elapsedTime = useElapsedTime(true, "loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setResults(data);
      })
      .then(() => {
        setShouldUnmount(true);
        setAnimateOut(true);
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
