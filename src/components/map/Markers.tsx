import * as L from "leaflet";
import React, { Fragment, useEffect } from "react";
import { FeatureGroup, LayerGroup, Marker, Popup, useMap } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

const Markers = () => {
  const markers = useMapStore((state) => state.markers);

  const icon = L.divIcon({
    className: "result-marker-icon",
    html: `<div style="width: 15px; height: 15px; background-color: rgba(255, 255, 255, 0.1); border: 2px grey solid; border-radius:9000px"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  return (
    <FeatureGroup>
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
    </FeatureGroup>
  );
};

export default Markers;
