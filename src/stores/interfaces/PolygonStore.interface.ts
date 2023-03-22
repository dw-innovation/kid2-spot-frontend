export default interface PolygonStoreInterface {
  polygon: [number, number][];
  addPolygonPoint: (point: [number, number]) => void;
  removePolygonPoint: (point: [number, number]) => void;
  clearPolygon: () => void;
  updatePolygonPoint: (index: number, newLatLng: [number, number]) => void;
  polygonOutsideBBox: boolean;
  togglePolygonOutsideBBox: (state?: boolean) => void;
}
