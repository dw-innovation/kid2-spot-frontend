import { FeatureCollection } from "geojson";

export type Spot = {
  bbox: number[];
  id: string;
  tags: { name?: string; "addr:street"?: string };
  nodes: string[];
};

export type Set = {
  id: string;
  name: string;
  visible: boolean;
  highlighted: boolean;
  fillColor: string;
  display_name: string;
};
export default interface ResultsStoreInterface {
  geoJSON: FeatureCollection | null;
  setGeoJSON: (geoJSON: FeatureCollection) => void;
  clearGeoJSON: () => void;
  sets: Set[];
  setSets: (sets: Set[]) => void;
  clearSets: () => void;
  toggleVisible: (id: string) => void;
  toggleHighlighted: (id: string, state?: boolean) => void;
  spots: Spot[];
  setSpots: (spots: Spot[]) => void;
  clearSpots: () => void;
  searchArea: FeatureCollection | null;
  setSearchArea: (searchArea: FeatureCollection) => void;
  showSearchArea: boolean;
  toggleSearchArea: (show?: boolean) => void;
  highlightSearchArea: boolean;
  toggleHighlightSearchArea: (highlight?: boolean) => void;
}
