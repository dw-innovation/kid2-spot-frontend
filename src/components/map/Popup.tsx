import React from "react";

import useStreetViewStore from "@/stores/useStreetViewStore";

import Button from "../Button";
import FeatureInfo from "./FeatureInfo";

type Props = {
  feature: any;
};

const Popup = ({ feature }: Props) => {
  const setStreetViewCoordinates = useStreetViewStore(
    (state) => state.setStreetViewCoordinates
  );
  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );

  const handleClick = () => {
    console.log("click");
    setStreetViewCoordinates(feature.geometry.coordinates);
    toggleStreetView(true);
  };

  return (
    <div>
      <FeatureInfo feature={feature} />
      <Button onClick={handleClick} className="bg-slate-200">
        view on Google Street View
      </Button>
    </div>
  );
};

export default Popup;
