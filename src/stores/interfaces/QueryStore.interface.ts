export default interface QueryStoreInterface {
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  searchArea: "bbox" | "polygon";
  setSearchArea: (searchArea: "bbox" | "polygon") => void;
  searchAreaBuffer: number;
  setSearchAreaBuffer: (searchAreaBuffer: number) => void;
  overpassAPIURL: string;
  setOverpassAPIURL: (overpassAPIURL: string) => void;
  jsonQuery: any;
  setJsonQuery: (jsonQuery: any) => void;
  initialize: (initialData: any) => void;
}
