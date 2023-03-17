import { LatLngBoundsLiteral, LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => void;
  tilesServer: "osm" | "vector";
  toggleTilesServer: () => void;
  bbox: LatLngBoundsLiteral;
  setBbox: (bbox: LatLngBoundsLiteral) => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  markers: any[];
  setMarkers: (markers: any[]) => void;
  clearMarkers: () => void;
  polygon: LatLngLiteral[];
  addPolygonPoint: (point: LatLngLiteral) => void;
  removePolygonPoint: (point: LatLngLiteral) => void;
  clearPolygon: () => void;
  polygonMode: boolean;
  togglePolygonMode: (newState?: boolean) => void;
}
