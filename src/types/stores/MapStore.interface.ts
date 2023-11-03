import { LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  tilesLayer: "vector" | "satellite" | "osm";
  setTilesLayer: (newLayer: "vector" | "satellite" | "osm") => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  bounds: [number, number][];
  setBounds: (bounds: [number, number][]) => void;
  activeSpot: string | undefined;
  setActiveSpot: (activeSpot: string | undefined) => void;
  initialize: (initialData: any) => void;
}
