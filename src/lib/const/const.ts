const MINSIZES = [
  { zoomLevel: 0, minArea: 5000000 }, // Very coarse detail at global level
  { zoomLevel: 3, minArea: 1000000 }, // Continental view
  { zoomLevel: 6, minArea: 100000 }, // Country-level view
  { zoomLevel: 9, minArea: 5000 }, // Regional view
  { zoomLevel: 12, minArea: 1000 }, // City view
  { zoomLevel: 15, minArea: 100 }, // Neighborhood view
  { zoomLevel: 18, minArea: 10 }, // Street-level view
];
