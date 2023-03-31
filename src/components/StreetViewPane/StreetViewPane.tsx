import React from "react";

import PlusIcon from "@/assets/icons/PlusIcon";
import { generateGoogleMapEmbedUrl } from "@/lib/utils";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Button from "../Button";

const StreetViewPane = () => {
  const streetViewCoordinates = useStreetViewStore(
    (state) => state.streetViewCoordinates
  );
  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );

  const handleClick = () => {
    toggleStreetView(false);
  };

  return (
    <div className="relative w-full h-full">
      <Button
        onClick={handleClick}
        className="absolute top-0 right-0 z-20 aspect-square"
      >
        <div className="rotate-45">
          <PlusIcon />
        </div>
      </Button>
      <iframe
        src={generateGoogleMapEmbedUrl(streetViewCoordinates)}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default StreetViewPane;
