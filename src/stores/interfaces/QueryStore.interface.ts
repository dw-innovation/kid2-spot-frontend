export default interface QueryStoreInterface {
  naturalLanguagePrompt: string;
  setNaturalLanguagePrompt: (naturalLanguagePrompt: string) => void;
  searchArea: "bbox" | "polygon";
  setSearchArea: (searchArea: "bbox" | "polygon") => void;
  searchAreaBuffer: number;
  setSearchAreaBuffer: (searchAreaBuffer: number) => void;
  imr: any;
  setImr: (imr: any) => void;
  initialize: (initialData: any) => void;
  setImrValue: (path: string, value: any) => void;
}
