import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Feature } from "geojson";
import React from "react";

import { Button } from "@/components/ui/button";
import { trackAction } from "@/lib/utils";
import useStreetViewStore from "@/stores/useStreetViewStore";

import FeatureInfo from "./FeatureInfo";

type Props = {
  feature: Feature;
};

const Popup = ({ feature }: Props) => {
  const setStreetViewCoordinates = useStreetViewStore(
    (state) => state.setStreetViewCoordinates
  );
  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );

  const handleClick = () => {
    if (!feature.properties || !feature.properties.center) return;

    feature.properties.tags.name &&
      trackAction("click", "openStreetView", feature.properties.tags.name);

    setStreetViewCoordinates({
      lat: feature.properties.center.coordinates[1],
      lng: feature.properties.center.coordinates[0],
    });
    toggleStreetView(true);
  };

  return (
    <div className="flex flex-col w-full gap-2 !font-sans">
      <FeatureInfo feature={feature} />
      <hr />
      <Button onClick={handleClick} variant={"secondary"}>
        <EyeOpenIcon />
        Open Google Street View
      </Button>
    </div>
  );
};

export default Popup;
