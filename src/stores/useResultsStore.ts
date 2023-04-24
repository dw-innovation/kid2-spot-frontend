import { FeatureCollection } from "geojson";
import produce from "immer";
import { create } from "zustand";

import ResultsStoreInterface from "./interfaces/ResultsStore.interface";

const useResultsStore = create<ResultsStoreInterface>((set) => ({
  geoJSON: null,
  setGeoJSON: (geoJSON: FeatureCollection) => {
    set(
      produce((draft) => {
        draft.geoJSON = geoJSON;
      })
    );
  },
  clearGeoJSON: () => {
    set(
      produce((draft) => {
        draft.geoJSON = null;
      })
    );
  },
}));

export default useResultsStore;
