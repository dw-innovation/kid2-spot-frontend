import { useRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import AddressSearchBox from "@/components/addressSearch";
import useOnClickOutside from "@/lib/hooks/useOnClickOutside";
import useMapStore from "@/stores/useMapStore";

import MapEvents from "./MapEvents";
import MapKeyEvents from "./MapKeyEvents";
import MapTools from "./MapTools";
import Markers from "./Markers";
import PolygonDrawer from "./polygon/PolygonDrawer";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const mapZoom = useMapStore((state) => state.mapZoom);
  const tilesServer = useMapStore((state) => state.tilesServer);
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);

  useOnClickOutside(mapContainerRef, () => togglePolygonMode(false)); // Close polygon mode when clicking outside the map

  return (
    <>
      <div className="absolute top-0 right-0 z-[9999] mt-2 mr-2 flex">
        <AddressSearchBox />
      </div>
      <div ref={mapContainerRef} className="w-full h-full">
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
      </div>
    </>
  );
};
export default MapContainer;
