import * as turf from "@turf/turf";
import { FeatureCollection, GeoJsonProperties } from "geojson";
import { LatLng } from "leaflet";

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

export const getNewBoundingBox = (
  originalBoundingBox: [number, number][],
  newCenter: LatLng
): [number, number][] => {
  const [southWest, northEast] = originalBoundingBox;
  const { lat, lng } = newCenter;

  const latDiff = (northEast[0] - southWest[0]) / 2;
  const lngDiff = (northEast[1] - southWest[1]) / 2;

  const newSouthWest: [number, number] = [lat - latDiff, lng - lngDiff];
  const newNorthEast: [number, number] = [lat + latDiff, lng + lngDiff];

  return [newSouthWest, newNorthEast];
};

export const convertToLatLng = (input: string): LatLng | null => {
  // DMS (Degrees, Minutes, Seconds) format: 40° 26' 46" N 79° 58' 56" W
  const dmsRegex =
    /^(\d{1,3})°\s(\d{1,2})'\s(\d{1,2}(\.\d+)?)["]\s(N|S)\s+(\d{1,3})°\s(\d{1,2})'\s(\d{1,2}(\.\d+)?)["]\s(E|W)$/;

  // DM (Degrees, Minutes) format: 40° 26.767' N 79° 58.933' W
  const dmRegex =
    /^(\d{1,3})°\s(\d{1,2}(\.\d+)?)'\s(N|S)\s+(\d{1,3})°\s(\d{1,2}(\.\d+)?)'\s(E|W)$/;

  // DD (Decimal Degrees) format: 40.446195, -79.948862
  const ddRegex = /^(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)$/;

  let lat: number, lng: number;

  if (dmsRegex.test(input)) {
    const match = input.match(dmsRegex);
    if (!match) return null;

    const [
      ,
      latDeg,
      latMin,
      latSec,
      ,
      latDir,
      lngDeg,
      lngMin,
      lngSec,
      ,
      lngDir,
    ] = match;

    lat =
      parseFloat(latDeg) + parseFloat(latMin) / 60 + parseFloat(latSec) / 3600;
    lng =
      parseFloat(lngDeg) + parseFloat(lngMin) / 60 + parseFloat(lngSec) / 3600;

    if (latDir === "S") lat = -lat;
    if (lngDir === "W") lng = -lng;
  } else if (dmRegex.test(input)) {
    const match = input.match(dmRegex);
    if (!match) return null;

    const [, latDeg, latMin, , latDir, lngDeg, lngMin, , lngDir] = match;

    lat = parseFloat(latDeg) + parseFloat(latMin) / 60;
    lng = parseFloat(lngDeg) + parseFloat(lngMin) / 60;

    if (latDir === "S") lat = -lat;
    if (lngDir === "W") lng = -lng;
  } else if (ddRegex.test(input)) {
    const match = input.match(ddRegex);
    if (!match) return null;

    const [, latStr, lngStr] = match;
    lat = parseFloat(latStr);
    lng = parseFloat(lngStr);
  } else {
    return null;
  }

  return window === undefined ? null : new window.L.LatLng(lat, lng);
};
