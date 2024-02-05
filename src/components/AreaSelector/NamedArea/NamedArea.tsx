import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import Select from "@/components/Select";
import { fetchAreas } from "@/lib/apiServices";
import { calculateSurface } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import { NominatimPlace } from "@/types/nominatim";

import SurfaceAlert from "../SurfaceAlert";

const NamedArea = () => {
  const [placeId, setPlaceId] = useState<number>(0);
  const [surface, setSurface] = useState<number>(0);
  const area = useImrStore((state) => state.imr.area.value);
  const setBounds = useMapStore((state) => state.setBounds);
  const setErrorType = useGlobalStore((state) => state.setError);
  const nextStep = useGlobalStore((state) => state.nextStep);

  const {
    data: suggestedAreas,
    isLoading,
    isError,
  } = useQuery<NominatimPlace[]>(
    ["fetchAreas", area],
    () => {
      // Nominatim API expects a string, area could be a bbox array
      const areaValue = typeof area === "string" ? area : area.toString();
      return fetchAreas(areaValue);
    },
    {
      onSuccess: (data) => {
        const firstOption = data[0]?.place_id;
        if (firstOption) setPlaceId(firstOption);
      },
      onError: (error) => {
        console.log(error);
        setErrorType("errorFetchingSuggestions");
      },
      // Only execute this query once on component mount
      enabled: !!area, // Run query only if area is not empty
    }
  );

  useEffect(() => {
    if (suggestedAreas?.length === 1) {
      setPlaceId(suggestedAreas[0].place_id);
      nextStep();
    }
  }, [suggestedAreas]);
  useEffect(() => {
    const suggestion = suggestedAreas?.find((a) => a.place_id === placeId);
    if (suggestion) {
      setSurface(calculateSurface(suggestion.geojson));
      const bounds = suggestion.boundingbox.map((b) => parseFloat(b));
      setBounds([
        [bounds[0], bounds[2]],
        [bounds[1], bounds[3]],
      ]);
    }
  }, [placeId, setBounds, suggestedAreas]);

  const options =
    suggestedAreas?.map(({ display_name, place_id }) => ({
      label: display_name,
      value: place_id.toString(),
    })) || [];

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
            value={placeId.toString()}
            onSelect={(value) => setPlaceId(parseInt(value))}
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
