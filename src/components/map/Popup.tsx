import { Feature } from "geojson";
import React from "react";

import useStreetViewStore from "@/stores/useStreetViewStore";

import Button from "../Button";
import FeatureInfo from "./FeatureInfo";

type Props = {
  feature: Feature;
};

const Popup = ({ feature }: Props) => {
  console.log(feature);
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
    <>
      <FeatureInfo feature={feature} />
      {feature.geometry.type === "Point" && (
        <Button onClick={handleClick} className="bg-slate-200">
          view on Google Street View
        </Button>
      )}
    </>
  );
};

export default Popup;
