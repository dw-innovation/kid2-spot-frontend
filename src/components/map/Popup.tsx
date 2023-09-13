import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Feature } from "geojson";
import React from "react";

import useStreetViewStore from "@/stores/useStreetViewStore";

import { Button } from "../ui/button";
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

    setStreetViewCoordinates({
      lat: feature.properties.center.coordinates[1],
      lng: feature.properties.center.coordinates[0],
    });
    toggleStreetView(true);
  };

  return (
    <div className="w-fit">
      <FeatureInfo feature={feature} />
      <Button onClick={handleClick} variant={"secondary"}>
        <EyeOpenIcon />
        Open Google Street View
      </Button>
    </div>
  );
};

export default Popup;
