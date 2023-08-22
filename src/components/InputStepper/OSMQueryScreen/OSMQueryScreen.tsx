import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import InputContainer from "../InputContainer";

const OSMQueryScreen = () => {
  const router = useRouter();
  const elapsedTime = useElapsedTime();
  const [, fetchData] = useApiStatus(fetchOSMData);
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const setSets = useResultsStore((state) => state.setSets);

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
      .then(() => router.push("/map"));
  }, []);

  return (
    <InputContainer title="Querying OpenStreetMap" shouldUnmount={false}>
      <LoadingSpinner size="2.5rem" />
      {elapsedTime} {elapsedTime === 1 ? `second` : `seconds`}
    </InputContainer>
  );
};

export default OSMQueryScreen;
