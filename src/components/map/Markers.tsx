import React, { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";

const Markers = () => {
  const markers = useSessionStore((state) => state.markers);
  return (
    <>
      {markers.length > 0 &&
        markers.map(({ lat, lon, ...item }, index) => (
          <Fragment key={index}>
            <Marker position={[lat, lon]}>
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
