export default interface QueryStoreInterface {
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  queryArea: "bbox" | "polygon" | "world";
  setQueryArea: (area: "bbox" | "polygon" | "world") => void;
}
