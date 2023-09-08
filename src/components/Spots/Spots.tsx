import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spot } from "@/stores/interfaces/ResultsStore.interface";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

const Spots = () => {
  const spots = useResultsStore((state) => state.spots);
  const setBounds = useMapStore((state) => state.setBounds);

  const handleSpotSelect = (id: number) => {
    const spot = spots.find((spot) => spot.id === id);
    if (!spot) return;
    setBounds([
      [spot.bbox[1], spot.bbox[0]],
      [spot.bbox[3], spot.bbox[2]],
    ]);
  };

  return (
    <div className="flex flex-col gap-1">
      <Select onValueChange={(value) => handleSpotSelect(parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a spot and zoom to it" />
        </SelectTrigger>
        <SelectContent className="z-[100000]">
          <SelectGroup>
            <SelectLabel>Found Spots</SelectLabel>
            {spots.map((spot: Spot, index: number) => (
              <SelectItem key={spot.id} value={spot.id.toString()}>
                {index + 1}: {spot.tags?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Spots;
