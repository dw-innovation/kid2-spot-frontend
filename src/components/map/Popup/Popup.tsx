import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Feature } from "geojson";
import React from "react";

import { Button } from "@/components/ui/button";
import { trackAction } from "@/lib/utils";
import useStreetViewStore from "@/stores/useStreetViewStore";

import FeatureInfo from "../FeatureInfo";
import MapServiceButtons from "./MapServiceButtons";

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
    <div className="flex flex-col w-full gap-4 !font-sans">
      <FeatureInfo feature={feature} />
      <hr />
      <div className="flex flex-col w-full gap-2">
        <span>Open this location in</span>
        {feature.properties && (
          <MapServiceButtons
            coordinates={[
              feature.properties.center.coordinates[1],
              feature.properties.center.coordinates[0],
            ]}
          />
        )}
      </div>

      <hr />

      <Button onClick={handleClick} variant={"secondary"}>
        Open Google Street View
        <EyeOpenIcon />
      </Button>
    </div>
  );
};

export default Popup;
