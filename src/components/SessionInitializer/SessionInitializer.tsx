"use client";

import { useEffect } from "react";

import { FILL_COLORS } from "@/lib/const/colors";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { bboxToGeoJSON, fetchOSMData } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const SessionInitializer = ({ data }: any) => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeImrStore = useImrStore((state) => state.initialize);

  data.useMapStore && initializeMapStore(data.useMapStore);
  data.useQueryStore && initializeQueryStore(data.useQueryStore);
  data.useStreetViewStore && initializeStreetViewStore(data.useStreetViewStore);
  data.useImrStore && initializeImrStore(data.useImrStore);

  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const setSets = useResultsStore((state) => state.setSets);
  const setSpots = useResultsStore((state) => state.setSpots);
  const setSearchArea = useResultsStore((state) => state.setSearchArea);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  const [, fetchData] = useApiStatus(fetchOSMData);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results && results.results) {
      setGeoJSON(results.results);

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

      if (results.area.type === "bbox") {
        parsedGeoJSON = bboxToGeoJSON(results.area.value);
      } else {
        parsedGeoJSON = JSON.parse(results.area.value);
      }
      setSearchArea(parsedGeoJSON);
      setSpots(results.spots);
    }
  };

  useEffect(() => {
    toggleDialog("queryOSM");
    handleOverpassQuerySubmit().then(() => toggleDialog("queryOSM"));
  }, []);

  return null;
};

export default SessionInitializer;
