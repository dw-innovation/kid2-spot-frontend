export default interface QueryStoreInterface {
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  queryArea: "bbox" | "polygon";
  setQueryArea: (area: "bbox" | "polygon") => void;
}
