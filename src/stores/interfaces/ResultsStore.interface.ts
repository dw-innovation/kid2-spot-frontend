import { FeatureCollection } from "geojson";

export type Spot = {
  bbox: number[];
  id: number;
  tags: { name?: string; "addr:street"?: string };
};
export default interface ResultsStoreInterface {
  geoJSON: FeatureCollection | null;
  setGeoJSON: (geoJSON: FeatureCollection) => void;
  clearGeoJSON: () => void;
  sets: {
    id: string;
    name: string;
    visible: boolean;
    highlighted: boolean;
  }[];
  setSets: (
    sets: {
      id: string;
      name: string;
      visible: boolean;
      highlighted: boolean;
    }[]
  ) => void;
  clearSets: () => void;
  toggleVisible: (id: string) => void;
  toggleHighlighted: (id: string) => void;
  spots: Spot[];
  setSpots: (spots: Spot[]) => void;
  clearSpots: () => void;
}
