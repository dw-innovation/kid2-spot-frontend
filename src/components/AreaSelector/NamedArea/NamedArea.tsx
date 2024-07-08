import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Select from "@/components/Select";
import { fetchAreas } from "@/lib/apiServices";
import { calculateSurface, trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import { NominatimPlace } from "@/types/nominatim";

import SurfaceAlert from "../SurfaceAlert";

const NamedArea = () => {
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [surface, setSurface] = useState<number>(0);
  const area = useImrStore((state) => state.imr.area.value);
  const areaType = useImrStore((state) => state.imr.area.type);
  const [detectedValue] = useState(area);
  const setBounds = useMapStore((state) => state.setBounds);
  const setErrorType = useGlobalStore((state) => state.setError);
  const nextStep = useGlobalStore((state) => state.nextStep);
  const setImrArea = useImrStore((state) => state.setImrArea);
  const setImrGeometry = useImrStore((state) => state.setImrGeometry);

  const queryKey = ["fetchAreas", detectedValue];

  const {
    data: suggestedAreas,
    isFetching,
    isError,
  } = useQuery<NominatimPlace[]>({
    queryKey,
    queryFn: () => {
      const detectedValueStr =
        typeof area === "string" ? area : area.toString();
      return fetchAreas(detectedValueStr);
    },
    enabled: !!area && areaType !== "bbox",
    retry: false,
  });

  useEffect(() => {
    if (suggestedAreas && suggestedAreas.length === 1) {
      trackAction("inputStepper", "areaSet", suggestedAreas[0].display_name);
      setSelectedAreaName(suggestedAreas[0].display_name);
      setImrArea(suggestedAreas[0].display_name);
      setImrGeometry(suggestedAreas[0].geojson);
      nextStep();
    }

    if (suggestedAreas) {
      setSelectedAreaName(suggestedAreas[0].display_name);
      setImrArea(suggestedAreas[0].display_name);
      setImrGeometry(suggestedAreas[0].geojson);
    }
  }, [suggestedAreas, setImrArea, nextStep]);

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
    setImrArea(value);
    setImrGeometry(suggestion.geojson);
  };

  return (
    <>
      {!isFetching && (
        <p className="text-sm text-muted-foreground">
          We have detected{" "}
          <span className="font-semibold contents">&quot;{area}&quot;</span> as
          search area from your input. Please confirm or select another area
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
