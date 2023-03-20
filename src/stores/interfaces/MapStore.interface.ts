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
  polygon: [number, number][];
  addPolygonPoint: (point: [number, number]) => void;
  removePolygonPoint: (point: [number, number]) => void;
  clearPolygon: () => void;
  polygonMode: boolean;
  togglePolygonMode: (newState?: boolean) => void;
  updatePolygonPoint: (index: number, newPoint: [number, number]) => void;
  bounds: [number, number][];
  setBounds: (bounds: [number, number][]) => void;
}
