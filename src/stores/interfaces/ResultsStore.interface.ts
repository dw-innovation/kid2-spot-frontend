import { FeatureCollection } from "geojson";

export default interface ResultsStoreInterface {
  geoJSON: FeatureCollection | null;
  setGeoJSON: (geoJSON: FeatureCollection) => void;
  clearGeoJSON: () => void;
  sets: {
    id: string;
    name: string;
    visible: boolean;
  }[];
  setSets: (
    sets: {
      id: string;
      name: string;
      visible: boolean;
    }[]
  ) => void;
  clearSets: () => void;
  toggleVisible: (id: string) => void;
}
