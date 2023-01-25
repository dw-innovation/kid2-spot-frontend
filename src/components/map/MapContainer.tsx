import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";
import MapEvents from "./MapEvents";
import Markers from "./Markers";

import VectorTileLayer from "react-leaflet-vector-tile-layer";
import { env } from "process";

const MapContainer = () => {
  const mapCenter = useSessionStore((state) => state.mapCenter);
  const mapZoom = useSessionStore((state) => state.mapZoom);
  return (
    <LeafletMapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={false}
    >
      <VectorTileLayer
        styleUrl={
          "https://kid2-osm-tiles-server.onrender.com/styles/basic-preview/style.json"
        }
      />
      <MapEvents />
      <Markers />
    </LeafletMapContainer>
  );
};
export default MapContainer;
