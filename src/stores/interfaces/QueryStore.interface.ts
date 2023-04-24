export default interface QueryStoreInterface {
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  searchArea: "bbox" | "polygon";
  setSearchArea: (searchArea: "bbox" | "polygon") => void;
  areaBuffer: number;
  setAreaBuffer: (areaBuffer: number) => void;
  overpassAPIURL: string;
  setOverpassAPIURL: (overpassAPIURL: string) => void;
}
