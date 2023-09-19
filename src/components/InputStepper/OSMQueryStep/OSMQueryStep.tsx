import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { FILL_COLORS } from "@/lib/const/colors";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { bboxToGeoJSON, fetchOSMData } from "@/lib/utils";
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
  const setSearchArea = useResultsStore((state) => state.setSearchArea);
  const setSpots = useResultsStore((state) => state.setSpots);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setGeoJSON(data.results);
        let shuffledColors = [...FILL_COLORS].sort(() => Math.random() - 0.5);

        let sets = data.sets.distinct_sets.map((set: any, index: number) => ({
          id: index,
          name: set,
          visible: true,
          highlighted: false,
          fillColor: shuffledColors[index],
        }));

        setSets(sets);
        let parsedGeoJSON;

        if (data.area.type === "bbox") {
          parsedGeoJSON = bboxToGeoJSON(data.area.value);
        } else {
          parsedGeoJSON = JSON.parse(data.area.value);
        }
        setSearchArea(parsedGeoJSON);
        setSpots(data.spots);
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
