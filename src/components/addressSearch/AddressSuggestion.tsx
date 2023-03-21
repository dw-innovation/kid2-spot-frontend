import React from "react";

import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";

const AddressSuggestion = ({
  place_name_en,
  geometry: { coordinates },
  bbox,
}: {
  place_name_en: string;
  geometry: { coordinates: number[] };
  bbox: number[];
}) => {
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  const setMapCenter = useMapStore((state) => state.setMapCenter);
  const setBounds = useMapStore((state) => state.setBounds);
  const toggleShowSuggestions = useAppStore(
    (state) => state.toggleShowSuggestions
  );
  return (
    <button
      onClick={() => {
        setMapCenter({ lat: coordinates[1], lng: coordinates[0] });
        setBounds([
          [bbox[1], bbox[0]],
          [bbox[3], bbox[2]],
        ]);

        setCurrentAddress({ placeName: place_name_en, coordinates });
        toggleShowSuggestions(false);
      }}
      className="w-full p-2 text-left cursor-pointer hover:bg-blue-200"
    >
      {place_name_en}
    </button>
  );
};

export default AddressSuggestion;
