export default interface PolygonStoreInterface {
  polygon: [number, number][];
  setPolygon: (polygon: [number, number][]) => void;
  clearPolygon: () => void;
  polygonOutsideBBox: boolean;
  togglePolygonOutsideBBox: (state?: boolean) => void;
}
