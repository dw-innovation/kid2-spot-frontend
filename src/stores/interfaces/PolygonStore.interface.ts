export default interface PolygonStoreInterface {
  polygon: [number, number][];
  setPolygon: (polygon: [number, number][]) => void;
  polygonOutsideBBox: boolean;
  togglePolygonOutsideBBox: (state?: boolean) => void;
}
