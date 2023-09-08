import React from "react";

import { Spot } from "@/stores/interfaces/ResultsStore.interface";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import { Button } from "../ui/button";

const Spots = () => {
  const spots = useResultsStore((state) => state.spots);
  const setBounds = useMapStore((state) => state.setBounds);

  const handleSpotClick = (spot: Spot) => {
    setBounds([
      [spot.bbox[1], spot.bbox[0]],
      [spot.bbox[3], spot.bbox[2]],
    ]);
  };

  return (
    <div className="flex flex-col gap-1">
      {spots.map((spot: Spot, index: number) => (
        <Button
          key={spot.id}
          className="flex gap-2 p-1 h-fit w-fit"
          variant={"secondary"}
          onClick={() => handleSpotClick(spot)}
        >
          Result {index + 1}: {spot.tags?.name}
        </Button>
      ))}
    </div>
  );
};

export default Spots;
