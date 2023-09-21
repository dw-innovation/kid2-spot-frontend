export default interface CustomSearchAreaStoreInterface {
  customSearchArea: [number, number][];
  setCustomSearchArea: (polygon: [number, number][]) => void;
  clearCustomSearchArea: () => void;
  customSearchAreaOutsideBBox: boolean;
  toggleCustomSearchAreaOutsideBBox: (state?: boolean) => void;
}
