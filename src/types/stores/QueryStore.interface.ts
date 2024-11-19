export default interface QueryStoreInterface {
  searchArea: "bbox" | "polygon";
  setSearchArea: (searchArea: "bbox" | "polygon") => void;
  searchAreaBuffer: number;
  setSearchAreaBuffer: (searchAreaBuffer: number) => void;
  initialize: (initialData: any) => void;
}
