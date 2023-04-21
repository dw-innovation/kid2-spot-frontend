import { FeatureCollection } from "geojson";
import { LatLngBoundsLiteral, LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  tilesLayer: "mapTilerVector" | "mapTilerHybrid" | "osm";
  setTilesLayer: (
    newLayer: "mapTilerVector" | "mapTilerHybrid" | "osm"
  ) => void;
  bbox: LatLngBoundsLiteral;
  setBbox: (bbox: LatLngBoundsLiteral) => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  geoJSON: FeatureCollection | null;
  setGeoJSON: (geoJSON: FeatureCollection) => void;
  clearGeoJSON: () => void;
  bounds: [number, number][];
  setBounds: (bounds: [number, number][]) => void;
}
