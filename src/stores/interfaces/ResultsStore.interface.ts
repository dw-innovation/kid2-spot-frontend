import { FeatureCollection } from "geojson";

export default interface ResultsStoreInterface {
  geoJSON: FeatureCollection | null;
  setGeoJSON: (geoJSON: FeatureCollection) => void;
  clearGeoJSON: () => void;
  sets: string[];
  setSets: (sets: string[]) => void;
  clearSets: () => void;
}
