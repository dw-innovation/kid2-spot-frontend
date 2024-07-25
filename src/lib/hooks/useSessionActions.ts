import useGlobalStore from "@/stores/useGlobalStore";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const useSessionActions = () => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeSpotQueryStore = useSpotQueryStore(
    (state) => state.initialize
  );
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);
  const clearSpots = useResultsStore((state) => state.clearSpots);
  const removeSession = useSessionsStore((state) => state.removeSession);

  return {
    initializeMapStore,
    initializeStreetViewStore,
    initializeSpotQueryStore,
    toggleDialog,
    clearGeoJSON,
    clearSets,
    clearSpots,
    removeSession,
  };
};

export default useSessionActions;
