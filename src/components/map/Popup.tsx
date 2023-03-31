import { LatLng } from "leaflet";
import React from "react";
import { Popup as LeafletPopup } from "react-leaflet";

import useStreetViewStore from "@/stores/useStreetViewStore";

import Button from "../Button";
import FeatureInfo from "./FeatureInfo";

type Props = {
  item: any;
  coordinates: LatLng;
};

const Popup = ({ item, coordinates }: Props) => {
  const setStreetViewCoordinates = useStreetViewStore(
    (state) => state.setStreetViewCoordinates
  );
  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );

  const handleClick = () => {
    setStreetViewCoordinates(coordinates);
    toggleStreetView(true);
  };

  return (
    <LeafletPopup>
      <FeatureInfo feature={item} />
      <Button onClick={handleClick} className="bg-slate-200">
        view on Google Street View
      </Button>
    </LeafletPopup>
  );
};

export default Popup;
