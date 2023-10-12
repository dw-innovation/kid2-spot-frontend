import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Select from "@/components/Select";
import { fetchAreas } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { calculateSurface } from "@/lib/utils";
import useErrorStore from "@/stores/useErrorStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import { NominatimPlace } from "@/types/nominatim";

import SurfaceAlert from "../SurfaceAlert";

const NamedArea = () => {
  const [placeId, setPlaceId] = useState<number>(0);
  const [suggestedAreas, setSuggestedAreas] = useState<NominatimPlace[]>([]);
  const [apiStatus, fetchData] = useApiStatus(fetchAreas);
  const [surface, setSurface] = useState<number>(0);
  const setBounds = useMapStore((state) => state.setBounds);
  const area = useImrStore((state) => state.imr.area.value);
  const setIsError = useErrorStore((state) => state.setIsError);
  const setMessage = useErrorStore((state) => state.setMessage);

  useEffect(() => {
    fetchData(area)
      .then(setSuggestedAreas)
      .catch(() => {
        setIsError(true);
        setMessage("errorFetchingSuggestions");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);

  const options = suggestedAreas.map(({ display_name, place_id }) => ({
    label: display_name,
    value: place_id.toString(),
  }));

  useEffect(() => {
    const firstOption = options[0]?.value;
    if (firstOption) setPlaceId(parseInt(firstOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestedAreas]);

  useEffect(() => {
    const suggestion = suggestedAreas.find((a) => a.place_id === placeId);
    if (suggestion) {
      setSurface(calculateSurface(suggestion.geojson));
      let bounds = suggestion.boundingbox.map((b) => parseFloat(b));
      setBounds([
        [bounds[0], bounds[2]],
        [bounds[1], bounds[3]],
      ]);
    }
  }, [placeId, setBounds, suggestedAreas]);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        We have detected{" "}
        <span className="font-semibold contents">&quot;{area}&quot;</span> as
        search area from your input. Please confirm or select another area from
        the list.
      </p>

      {apiStatus === "loading" ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          Loading suggestions
        </div>
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
