import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

export const useSessionActions = () => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeImrStore = useImrStore((state) => state.initialize);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);
  const clearSpots = useResultsStore((state) => state.clearSpots);
  const removeSession = useSessionsStore((state) => state.removeSession);

  return {
    initializeMapStore,
    initializeQueryStore,
    initializeStreetViewStore,
    initializeImrStore,
    toggleDialog,
    clearGeoJSON,
    clearSets,
    clearSpots,
    removeSession,
  };
};
