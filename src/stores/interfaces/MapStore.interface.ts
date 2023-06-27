import { LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  tilesLayer: "vector" | "mapTilerHybrid" | "osm";
  setTilesLayer: (newLayer: "vector" | "mapTilerHybrid" | "osm") => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  bounds: [number, number][];
  setBounds: (bounds: [number, number][]) => void;
  initialize: (initialData: any) => void;
}
