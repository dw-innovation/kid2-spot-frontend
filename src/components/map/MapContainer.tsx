import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";
import MapEvents from "./MapEvents";
import Markers from "./Markers";

import VectorTileLayer from "react-leaflet-vector-tile-layer";

const MapContainer = () => {
  const mapCenter = useSessionStore((state) => state.mapCenter);
  const mapZoom = useSessionStore((state) => state.mapZoom);
  const tilesServer = useSessionStore((state) => state.tilesServer);
  return (
    <LeafletMapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={true}
    >
      {tilesServer === "osm" && (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      )}
      {tilesServer === "vector" && (
        <VectorTileLayer
          styleUrl={
            "https://api.maptiler.com/maps/basic-v2/style.json?key=MxLldSRmmd4tNtToPzY1"
          }
        />
      )}

      <MapEvents />
      <Markers />
    </LeafletMapContainer>
  );
};
export default MapContainer;
