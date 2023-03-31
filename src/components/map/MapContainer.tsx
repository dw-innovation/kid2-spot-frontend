import { useRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

import AddressSearchBox from "@/components/addressSearch";
import useMapStore from "@/stores/useMapStore";

import MapEvents from "./MapEvents";
import MapKeyEvents from "./MapKeyEvents";
import MapResizeHandler from "./MapResizeHandler";
import Markers from "./Markers";
import PolygonBuffer from "./polygon/PolygonBuffer";
import PolygonDrawer from "./polygon/PolygonDrawer";
import PolygonOutsideAlert from "./polygon/PolygonOutsideAlert";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const mapZoom = useMapStore((state) => state.mapZoom);
  const tilesServer = useMapStore((state) => state.tilesServer);

  return (
    <>
      <div className="absolute top-0 right-0 z-[9999] mt-2 mr-2 flex">
        <PolygonOutsideAlert />
        <AddressSearchBox />
      </div>
      <div ref={mapContainerRef} className="w-full h-full">
        <LeafletMapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="cursor-crosshair"
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
          <MapResizeHandler mapContainerRef={mapContainerRef} />
          <MapEvents />
          <MapKeyEvents />
          <PolygonDrawer />
          <PolygonBuffer />
          <Markers />
        </LeafletMapContainer>
      </div>
    </>
  );
};
export default MapContainer;
