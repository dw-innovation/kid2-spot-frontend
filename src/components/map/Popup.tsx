import { LatLng } from "leaflet";
import React from "react";
import { Popup as LeafletPopup } from "react-leaflet";

import useStreetViewStore from "@/stores/useStreetViewStore";

import Button from "../Button";

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
    toggleStreetView();
  };

  return (
    <LeafletPopup>
      <pre>{JSON.stringify(item, null, 2)}</pre>
      <Button onClick={handleClick}>view on Google Street View</Button>
    </LeafletPopup>
  );
};

export default Popup;
