import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { useStrings } from "@/lib/contexts/useStrings";
import { capitalize } from "@/lib/utils";
import { Spot } from "@/stores/interfaces/ResultsStore.interface";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import Select from "../Select";

const Spots = () => {
  const { commonSelectSpotPlaceholder } = useStrings();
  const spots = useResultsStore((state) => state.spots);
  const sets = useResultsStore((state) => state.sets);
  const setBounds = useMapStore((state) => state.setBounds);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const { width } = useWindowSize();
  const setActiveSpot = useMapStore((state) => state.setActiveSpot);

  const handleSpotSelect = (id: string) => {
    const spot = spots.find((spot) => spot.id === id);
    setActiveSpot(id);
    if (!spot) return;
    setBounds([
      [spot.bbox[1], spot.bbox[0]],
      [spot.bbox[3], spot.bbox[2]],
    ]);
  };

  useEffect(() => {
    setActiveSpot(undefined);
    let availableOptions = spots
      .map((spot: Spot, index: number) =>
        spot.id
          ? {
              label: `${index + 1}: ${
                spot?.tags?.name
                  ? spot?.tags?.name
                  : `Unnamed ${capitalize(sets[0].name)}`
              }`,
              value: spot.id.toString(),
            }
          : null
      )
      .filter(Boolean) as { value: string; label: string }[];

    setOptions(availableOptions);
  }, [spots]);

  return (
    <div className="flex flex-col gap-1">
      <Select
        options={options}
        onSelect={(value) => handleSpotSelect(value)}
        className="max-w-[5rem] md:w-[15rem] md:max-w-[15rem] z-[1000] h-full"
        placeholder={commonSelectSpotPlaceholder()}
        enableReset
        isSearchable={width > 768}
      />
    </div>
  );
};

export default Spots;
