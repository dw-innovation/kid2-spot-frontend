import { LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => void;
  tilesServer: "osm" | "vector";
  toggleTilesServer: () => void;
  bbox: number[];
  setBbox: (bbox: number[]) => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  markers: any[];
  setMarkers: (markers: any[]) => void;
  clearMarkers: () => void;
  polygon: LatLngLiteral[];
  addPolygonPoint: (point: LatLngLiteral) => void;
  removePolygonPoint: (point: LatLngLiteral) => void;
  clearPolygon: () => void;
}
