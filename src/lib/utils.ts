import * as turf from "@turf/turf";
import axios from "axios";
import { LatLngLiteral } from "leaflet";

import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";

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

const substituteAreaInQuery = (query: string): string => {
  const queryArea = useQueryStore.getState().queryArea;
  const areaBuffer = useQueryStore.getState().areaBuffer;
  let bbox = useMapStore.getState().bbox;
  let polygon = usePolygonStore.getState().polygon;

  let area = "";

  switch (queryArea) {
    case "polygon":
      let enlargedPolygon = expandPolygonByDistance(polygon, areaBuffer);
      let polygoAreaString = enlargedPolygon
        .map((point: number[]) => `${point[0]} ${point[1]}`)
        .join(" ");
      area = `poly: "${polygoAreaString}"`;
      break;

    default:
      area = bbox.flatMap((innerArray) => innerArray).join(",");
      break;
  }

  return query.replaceAll("{{AREA}}", area);
};

export const fetchOverpassApiData = async (): Promise<any> => {
  let setApiState = useAppStore.getState().setApiState;
  setApiState("loading");

  let overpassQuery = useQueryStore.getState().overpassQuery;
  let overpassAPIURL = useQueryStore.getState().overpassAPIURL;
  let overpassQueryWithArea = substituteAreaInQuery(overpassQuery);

  var config = {
    method: "get",
    url: overpassAPIURL,
    params: {
      data: overpassQueryWithArea,
    },
  };

  const results = axios(config)
    .then((response) => {
      setApiState("idle");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      setApiState("error");
      return null;
    });

  return results;
};

export const fetchGeocodeApiData = async (address: string): Promise<any> => {
  if (!address) return;

  const response = await axios({
    method: "GET",
    url: `https://api.maptiler.com/geocoding/${address}.json`,
    params: {
      key: process.env.NEXT_PUBLIC_MAPTILER_KEY,
      language: "en",
      limit: 5,
      types:
        "region,subregion,county,joint_municipality,joint_submunicipality,municipality,municipal_district,locality",
    },
  });

  const { features } = await response.data;
  return features;
};

export const saveResultsToFile = () => {
  let results = useMapStore.getState().geoJSON;
  const fileData = JSON.stringify(results);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "export.json";
  link.href = url;
  link.click();
};

export const saveQueryToFile = () => {
  let overpassQuery = useQueryStore.getState().overpassQuery;
  const blob = new Blob([overpassQuery], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "overpassQuery.txt";
  link.href = url;
  link.click();
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

export const createGoogleMapsEmbedUrl = (coordinates: LatLngLiteral) => {
  if (!coordinates) {
    return undefined;
  }

  const baseUrl = "https://www.google.com/maps/embed/v1/streetview";
  const coordinatesString = `${String(coordinates.lat)},${String(
    coordinates.lng
  )}`;
  const url = `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${coordinatesString}`;

  return url;
};
