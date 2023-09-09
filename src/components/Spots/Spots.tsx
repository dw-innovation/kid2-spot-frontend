import React, { useEffect, useState } from "react";

import { Spot } from "@/stores/interfaces/ResultsStore.interface";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import Select from "../Select";

const Spots = () => {
  const spots = useResultsStore((state) => state.spots);
  const setBounds = useMapStore((state) => state.setBounds);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const handleSpotSelect = (id: number) => {
    const spot = spots.find((spot) => spot.id === id);
    if (!spot) return;
    setBounds([
      [spot.bbox[1], spot.bbox[0]],
      [spot.bbox[3], spot.bbox[2]],
    ]);
  };

  useEffect(() => {
    let availableOptions = spots
      .map((spot: Spot, index: number) =>
        spot.id
          ? {
              label: `${index + 1}: ${
                spot?.tags?.name ? spot?.tags?.name : "Unnamed"
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
        value={spots[0]?.id.toString()}
        onSelect={(value) => handleSpotSelect(parseInt(value))}
        className="w-[15rem] truncate ..."
        placeholder="Select a spot"
      />
    </div>
  );
};

export default Spots;
