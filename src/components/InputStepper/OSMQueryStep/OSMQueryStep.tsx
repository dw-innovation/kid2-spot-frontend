import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import { useInputStepper } from "../Context";
import InputContainer from "../InputContainer";

const OSMQueryStep = () => {
  const router = useRouter();
  const { setAnimateOut } = useInputStepper();
  const [, fetchData] = useApiStatus(fetchOSMData);
  const elapsedTime = useElapsedTime(true, "loading");
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const setSets = useResultsStore((state) => state.setSets);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setGeoJSON(data.results);

        let sets = data.sets.distinct_sets.map((set: any, index: number) => ({
          id: index,
          name: set,
          visible: true,
        }));
        setSets(sets);
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
