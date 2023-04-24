import * as turf from "@turf/turf";
import { FeatureCollection, GeoJsonProperties } from "geojson";

type BoundingBox = [number, number, number, number];
type Coordinate = [number, number];

interface Bounds {
  _southWest: {
    lat: number;
    lng: number;
  };
  _northEast: {
    lat: number;
    lng: number;
  };
}

export const isPolygonWithinBoundingBox = (
  polygon: [number, number][],
  boundingBox: turf.BBox
): boolean => {
  try {
    if (polygon.length < 3) return true;
    const polygonFeature = turf.polygon([polygon.concat([polygon[0]])]);
    const boundingBoxPolygon = turf.bboxPolygon(boundingBox);

    const isWithin = turf.booleanContains(boundingBoxPolygon, polygonFeature);
    return isWithin;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const convertBoundsToBboxArray = (bbox: Bounds): number[] => {
  return [
    bbox._southWest.lat,
    bbox._southWest.lng,
    bbox._northEast.lat,
    bbox._northEast.lng,
  ];
};

export const getBoundingBox = (geojson: FeatureCollection): BoundingBox => {
  return turf.bbox(geojson) as BoundingBox;
};

export const expandPolygonByDistance = (
  polygonCoordinates: Coordinate[],
  distance: number
): Coordinate[] => {
  if (distance === 0 || isNaN(distance)) return polygonCoordinates;

  const closedPolygon = polygonCoordinates.concat([polygonCoordinates[0]]);

  const inputPolygon = turf.polygon([closedPolygon]);

  const bufferedPolygon = turf.buffer(inputPolygon, distance, {
    units: "meters",
  });

  const enlargedPolygonCoordinates = bufferedPolygon.geometry
    .coordinates[0] as Coordinate[];

  return enlargedPolygonCoordinates;
};

export const allFeaturesWithinBoundingBox = (
  geojson: turf.FeatureCollection<turf.Geometry, GeoJsonProperties>,
  boundingBox: BoundingBox
): boolean => {
  const boundingBoxPolygon = turf.bboxPolygon(boundingBox);
  let allFeaturesWithin = true;

  turf.featureEach(geojson, (currentFeature) => {
    if (!turf.booleanContains(boundingBoxPolygon, currentFeature)) {
      allFeaturesWithin = false;
    }
  });

  return allFeaturesWithin;
};
