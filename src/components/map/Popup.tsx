import { AllSidesIcon } from "@radix-ui/react-icons";
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
    if (feature.geometry.type !== "Point") return;
    setStreetViewCoordinates({
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
    });
    toggleStreetView(true);
  };

  return (
    <div className="w-fit">
      <FeatureInfo feature={feature} />
      {feature.geometry.type === "Point" && (
        <Button onClick={handleClick} variant={"secondary"}>
          <AllSidesIcon />
          Open Google Street View
        </Button>
      )}
    </div>
  );
};

export default Popup;
