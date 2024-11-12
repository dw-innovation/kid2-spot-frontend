export const MINSIZES = [
  { zoomLevel: 0, minArea: 50000000 }, // Very coarse detail at global level
  { zoomLevel: 3, minArea: 10000000 }, // Continental view
  { zoomLevel: 6, minArea: 1000000 }, // Country-level view
  { zoomLevel: 9, minArea: 50000 }, // Regional view
  { zoomLevel: 12, minArea: 10000 }, // City view
  { zoomLevel: 15, minArea: 1000 }, // Neighborhood view
  { zoomLevel: 18, minArea: 100 }, // Street-level view
];
