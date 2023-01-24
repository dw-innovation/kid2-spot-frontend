import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import MapEvents from "./MapEvents";

const MapContainer = () => {
  return (
    <LeafletMapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
    </LeafletMapContainer>
  );
};
export default MapContainer;
