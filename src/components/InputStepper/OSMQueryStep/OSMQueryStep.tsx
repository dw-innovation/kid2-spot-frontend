import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useInputStepper } from "@/components/InputStepper/Context";
import InputContainer from "@/components/InputStepper/InputContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchOSMData } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { setResults } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";

import QueryAnimation from "../Animation";

const OSMQueryStep = () => {
  const router = useRouter();
  const { setAnimateOut } = useInputStepper();
  const [, fetchData] = useApiStatus(fetchOSMData);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputContainer
      title="Querying OpenStreetMap"
      shouldUnmount={shouldUnmount}
    >
      <QueryAnimation
        sentences={[
          "Constructing your query",
          "Finding all nodes and ways",
          "Filtering by relations",
          "Just a moment, we're close to finishing!",
        ]}
        duration={4000}
      />
      <LoadingSpinner size="2.5rem" />
    </InputContainer>
  );
};

export default OSMQueryStep;
