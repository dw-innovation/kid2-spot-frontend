"use client";

import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const SessionInitializer = ({ data }: any) => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeImrStore = useImrStore((state) => state.initialize);

  data.useMapStore && initializeMapStore(data.useMapStore);
  data.useQueryStore && initializeQueryStore(data.useQueryStore);
  data.useStreetViewStore && initializeStreetViewStore(data.useStreetViewStore);
  data.useImrStore && initializeImrStore(data.useImrStore);

  return null;
};

export default SessionInitializer;
