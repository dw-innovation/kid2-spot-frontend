"use client";

import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const SessionInitializer = ({ data }: any) => {
  const initializeAppStore = useMapStore((state) => state.initialize);
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );

  data.useAppStore && initializeAppStore(data.useAppStore);
  data.useMapStore && initializeMapStore(data.useMapStore);
  data.useQueryStore && initializeQueryStore(data.useQueryStore);
  data.useStreetViewStore && initializeStreetViewStore(data.useStreetViewStore);

  return null;
};

export default SessionInitializer;
