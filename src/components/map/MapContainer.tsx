import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";
import MapEvents from "./MapEvents";
import Markers from "./Markers";

const MapContainer = () => {
  const mapCenter = useSessionStore((state) => state.mapCenter);
  return (
    // @ts-ignore
    <LeafletMapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      <Markers />
    </LeafletMapContainer>
  );
};
export default MapContainer;
