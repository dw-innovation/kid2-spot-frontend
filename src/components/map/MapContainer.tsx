import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import AddressSearchBox from "@/components/addressSearch";
import useMapStore from "@/stores/useMapStore";

import MapEvents from "./MapEvents";
import MapKeyEvents from "./MapKeyEvents";
import MapTools from "./MapTools";
import Markers from "./Markers";
import PolygonDrawer from "./PolygonDrawer";

const MapContainer = () => {
  const mapCenter = useMapStore((state) => state.mapCenter);
  const mapZoom = useMapStore((state) => state.mapZoom);
  const tilesServer = useMapStore((state) => state.tilesServer);
  return (
    <>
      <div className="absolute top-0 right-0 z-[9999] mt-2 mr-2 flex">
        <AddressSearchBox />
      </div>

      <LeafletMapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="cursor-crosshair"
        zoomControl={false}
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

        <MapTools />
        <MapEvents />
        <MapKeyEvents />
        <PolygonDrawer />
        <Markers />
      </LeafletMapContainer>
    </>
  );
};
export default MapContainer;
