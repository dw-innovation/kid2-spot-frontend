import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Select from "@/components/Select";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { calculateSurface, getAreas } from "@/lib/utils";
import { Place } from "@/types/nominatim";

import SurfaceAlert from "./SurfaceAlert";

type Props = {
  area: string;
};

const AreaSelector = ({ area }: Props) => {
  const [placeId, setPlaceId] = useState<number>(0);
  const [suggestedAreas, setSuggestedAreas] = useState<Place[]>([]);
  const [apiStatus, fetchData] = useApiStatus(getAreas);
  const [surface, setSurface] = useState<number>(0);

  useEffect(() => {
    fetchData(area).then(setSuggestedAreas);
  }, [area]);

  const options = suggestedAreas.map(({ display_name, place_id }) => ({
    label: display_name,
    value: place_id.toString(),
  }));

  useEffect(() => {
    const firstOption = options[0]?.value;
    if (firstOption) setPlaceId(parseInt(firstOption));
  }, [suggestedAreas]);

  useEffect(() => {
    const suggestion = suggestedAreas.find((a) => a.place_id === placeId);
    if (suggestion) setSurface(calculateSurface(suggestion.geojson));
  }, [placeId]);

  return (
    <div>
      {apiStatus === "loading" ? (
        <LoadingSpinner />
      ) : options.length > 0 ? (
        <>
          <Select
            options={options}
            value={placeId.toString()}
            onSelect={(value) => setPlaceId(parseInt(value))}
          />
          <SurfaceAlert surface={surface} />
        </>
      ) : null}
    </div>
  );
};

export default AreaSelector;
