export default interface QueryStoreInterface {
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
}
