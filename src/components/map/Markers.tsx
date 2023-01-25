import * as L from "leaflet";
import React, { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import useSessionStore from "@/stores/useSessionStore";

const Markers = () => {
  const markers = useSessionStore((state) => state.markers);
  const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [20, 30],
  });
  return (
    <>
      {markers.length > 0 &&
        markers.map(({ lat, lon, ...item }, index) => (
          <Fragment key={index}>
            <Marker position={[lat, lon]} icon={icon}>
              <Popup>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </Popup>
            </Marker>
          </Fragment>
        ))}
    </>
  );
};

export default Markers;
