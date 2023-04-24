import * as turf from "@turf/turf";
import { FeatureCollection } from "geojson";

import usePolygonStore from "@/stores/usePolygonStore";

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

export const checkPolygonBBoxIntersection = (
  bbox: [number, number][]
): boolean => {
  let polygon = usePolygonStore.getState().polygon;
  if (polygon.length === 0) return false;

  let closedPolygon = polygon.concat([polygon[0]]);

  let polygonFeature = turf.polygon([closedPolygon]);

  let bboxFeature = turf.bboxPolygon([
    bbox[0][0],
    bbox[0][1],
    bbox[1][0],
    bbox[1][1],
  ]);

  let intersection = turf.intersect(polygonFeature, bboxFeature);

  return intersection === null ? true : false;
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
