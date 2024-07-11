import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Select from "@/components/Select";
import { fetchAreas } from "@/lib/apiServices";
import { calculateSurface, trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useMapStore from "@/stores/useMapStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { NominatimPlace } from "@/types/nominatim";

import SurfaceAlert from "../SurfaceAlert";

const NamedArea = () => {
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [surface, setSurface] = useState<number>(0);
  const areaType = useSpotQueryStore((state) => state.spotQuery.area.type);
  const areaName = useSpotQueryStore((state) => state.spotQuery.area.value);
  const [detectedValue] = useState(areaName);
  const setBounds = useMapStore((state) => state.setBounds);
  const setErrorType = useGlobalStore((state) => state.setError);
  const nextStep = useGlobalStore((state) => state.nextStep);
  const setSearchAreaName = useSpotQueryStore(
    (state) => state.setSearchAreaName
  );
  const setSearchAreaGeometry = useSpotQueryStore(
    (state) => state.setSearchAreaGeometry
  );

  const queryKey = ["fetchAreas", detectedValue];

  const {
    data: suggestedAreas,
    isFetching,
    isError,
  } = useQuery<NominatimPlace[]>({
    queryKey,
    queryFn: () => {
      return fetchAreas(areaName);
    },
    enabled: !!areaName && areaType !== "bbox",
    retry: false,
  });

  useEffect(() => {
    if (suggestedAreas && suggestedAreas.length === 1) {
      trackAction("inputStepper", "areaSet", suggestedAreas[0].display_name);
      setSelectedAreaName(suggestedAreas[0].display_name);
      setSearchAreaName(suggestedAreas[0].display_name);
      setSearchAreaGeometry(suggestedAreas[0].geojson);
      nextStep();
    }

    if (suggestedAreas) {
      setSelectedAreaName(suggestedAreas[0].display_name);
      setSearchAreaName(suggestedAreas[0].display_name);
      setSearchAreaGeometry(suggestedAreas[0].geojson);
    }
  }, [suggestedAreas, setSearchAreaName, nextStep]);

  useEffect(() => {
    if (areaType === "bbox") {
      nextStep();
    }
  }, [areaType, nextStep]);

  useEffect(() => {
    if (suggestedAreas) {
      const suggestion = suggestedAreas.find(
        (a) => a.display_name === selectedAreaName
      );
      if (suggestion) {
        setSurface(calculateSurface(suggestion.geojson));
        const bounds = suggestion.boundingbox.map((b) => parseFloat(b));
        setBounds([
          [bounds[0], bounds[2]],
          [bounds[1], bounds[3]],
        ]);
      }
    }
  }, [selectedAreaName, suggestedAreas, setBounds]);

  useEffect(() => {
    if (isError) {
      setErrorType("errorFetchingSuggestions");
    }
  }, [isError, setErrorType]);

  const options =
    suggestedAreas?.map(({ display_name }) => ({
      label: display_name,
      value: display_name,
    })) || [];

  const handleSetArea = (value: string) => {
    const suggestion = suggestedAreas?.find((a) => a.display_name === value);

    if (!suggestion) return;

    trackAction("inputStepper", "areaSet", value);
    setSelectedAreaName(value);
    setSurface(calculateSurface(suggestion.geojson));

    const bounds = suggestion.boundingbox.map((b) => parseFloat(b));
    setBounds([
      [bounds[0], bounds[2]],
      [bounds[1], bounds[3]],
    ]);

    setSearchAreaName(value);
    setSearchAreaGeometry(suggestion.geojson);
  };

  return (
    <>
      {!isFetching && (
        <p className="text-sm text-muted-foreground">
          We have detected{" "}
          <span className="font-semibold contents">&quot;{areaName}&quot;</span>{" "}
          as search area from your input. Please confirm or select another area
          from the list.
        </p>
      )}

      {isFetching ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          Loading suggestions
        </div>
      ) : isError ? (
        <div>Error</div>
      ) : options.length > 0 ? (
        <>
          <Select
            options={options}
            value={selectedAreaName}
            onSelect={handleSetArea}
            className="max-w-full"
            defaultValue={options[0]}
          />
          <SurfaceAlert surface={surface} />
        </>
      ) : null}
    </>
  );
};

export default NamedArea;
