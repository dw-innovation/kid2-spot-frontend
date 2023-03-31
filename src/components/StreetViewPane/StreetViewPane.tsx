import React from "react";

import { generateGoogleMapEmbedUrl } from "@/lib/utils";
import useStreetViewStore from "@/stores/useStreetViewStore";

const StreetViewPane = () => {
  const streetViewCoordinates = useStreetViewStore(
    (state) => state.streetViewCoordinates
  );

  return (
    <iframe
      src={generateGoogleMapEmbedUrl(streetViewCoordinates)}
      width="100%"
      height="100%"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default StreetViewPane;
