import * as L from "leaflet";
import React, { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

const Markers = () => {
  const markers = useMapStore((state) => state.markers);
  const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [20, 30],
  });
  return (
    <>
      {markers.length > 0 &&
        markers.map(({ lat, lon, ...item }, index) =>
          lat === undefined || lon === undefined ? null : (
            <Fragment key={index}>
              <Marker position={new L.LatLng(lat, lon)} icon={icon}>
                <Popup>
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                  <a
                    href={`https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    view on Google Street View
                  </a>
                </Popup>
              </Marker>
            </Fragment>
          )
        )}
    </>
  );
};

export default Markers;
