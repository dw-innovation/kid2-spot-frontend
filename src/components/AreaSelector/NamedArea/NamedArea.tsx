import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

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

  const {
    data: suggestedAreas,
    isLoading,
    isError,
  } = useQuery<NominatimPlace[]>(
    ["fetchAreas", detectedValue],
    () => {
      // Nominatim API expects a string, area could be a bbox array
      const detectedValue = typeof area === "string" ? area : area.toString();
      return fetchAreas(detectedValue);
    },
    {
      onSuccess: (data) => {
        const firstOptionName = data[0]?.display_name;
        if (firstOptionName) setSelectedAreaName(firstOptionName);
      },
      onError: (error) => {
        console.log(error);
        setErrorType("errorFetchingSuggestions");
      },
      // Only execute this query once on component mount
      enabled: !!area && areaType !== "bbox", // Run query only if area is not empty
      retry: false,
    }
  );

  useEffect(() => {
    if (suggestedAreas?.length === 1) {
      trackAction("inputStepper", "areaSet", suggestedAreas[0].display_name);
      setSelectedAreaName(suggestedAreas[0].display_name);
      setImrArea(suggestedAreas[0].display_name);
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestedAreas]);

  useEffect(() => {
    if (areaType === "bbox") {
      nextStep();
    }
  }, []);

  useEffect(() => {
    const suggestion = suggestedAreas?.find(
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
  }, [selectedAreaName, setBounds, suggestedAreas]);

  const options =
    suggestedAreas?.map(({ display_name }) => ({
      label: display_name,
      value: display_name,
    })) || [];

  const handleSetArea = (value: string) => {
    const suggestion = suggestedAreas?.find(
      (a) => a.display_name === selectedAreaName
    );
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
  };

  return (
    <>
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          We have detected{" "}
          <span className="font-semibold contents">&quot;{area}&quot;</span> as
          search area from your input. Please confirm or select another area
          from the list.
        </p>
      )}

      {isLoading ? (
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
