import { Set } from "../types/stores/ResultsStore.interface";

export const getSetIndex = (setName: string | undefined, sets: Set[]) => {
  return sets.findIndex((set) => set.name === setName);
};

export const getSetColor = (
  setIndex: number,
  currentNodeId: string,
  sets: Set[],
  spotNodes: string[]
) => {
  if (sets[setIndex] && sets[setIndex].visible) {
    if (sets[setIndex].highlighted || spotNodes.includes(currentNodeId)) {
      return "#C0392B";
    } else {
      return "#fff";
    }
  } else {
    return "transparent";
  }
};

export const getSetFillOpacity = (setIndex: number, sets: Set[]) => {
  return sets[setIndex] && sets[setIndex].visible ? 0.8 : 0;
};

export const getWeight = (
  setIndex: number,
  currentNodeId: string,
  sets: Set[],
  spotNodes: string[]
) => {
  return (sets[setIndex] && sets[setIndex].highlighted) ||
    spotNodes.includes(currentNodeId)
    ? 2.5
    : 1;
};

export const resetPreviousLayerStyle = (
  previousClickedLayer: React.MutableRefObject<L.CircleMarker<any> | null>
) => {
  if (previousClickedLayer.current) {
    previousClickedLayer.current.setStyle({
      color: "#3388ff",
    });
  }
};
