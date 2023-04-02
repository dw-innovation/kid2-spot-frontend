import { LatLngBoundsLiteral, LatLngLiteral } from "leaflet";

export default interface MapStoreInterface {
  mapCenter: LatLngLiteral | undefined;
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => void;
  tilesLayer: "mapTilerVector" | "mapTilerHybrid" | "osm";
  setTilesLayer: (
    newLayer: "mapTilerVector" | "mapTilerHybrid" | "osm"
  ) => void;
  bbox: LatLngBoundsLiteral;
  setBbox: (bbox: LatLngBoundsLiteral) => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  markers: any[];
  setMarkers: (markers: any[]) => void;
  clearMarkers: () => void;
  bounds: [number, number][];
  setBounds: (bounds: [number, number][]) => void;
}
