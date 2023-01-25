import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";
import useSessionStore from "src/stores/useSessionStore";

import AddressSearchBox from "@/components/addressSearch";

import MapEvents from "./MapEvents";
import Markers from "./Markers";

const MapContainer = () => {
  const mapCenter = useSessionStore((state) => state.mapCenter);
  const mapZoom = useSessionStore((state) => state.mapZoom);
  const tilesServer = useSessionStore((state) => state.tilesServer);
  return (
    <>
      <div className="absolute top-0 right-0 z-[9999] mt-2 mr-2">
        <AddressSearchBox />
      </div>

      <LeafletMapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="relative"
      >
        {tilesServer === "osm" && (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        )}
        {tilesServer === "vector" && (
          <VectorTileLayer
            styleUrl={`https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
          />
        )}

        <MapEvents />
        <Markers />
      </LeafletMapContainer>
    </>
  );
};
export default MapContainer;
