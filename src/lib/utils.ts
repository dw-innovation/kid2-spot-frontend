import axios from "axios";
import { LatLngLiteral } from "leaflet";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";

const substituteAreaInQuery = (query: string): string => {
  const searchArea = useQueryStore.getState().searchArea;
  const areaBuffer = useQueryStore.getState().areaBuffer;
  let bbox = useMapStore.getState().bbox;
  let polygon = usePolygonStore.getState().polygon;

  let area = "";

  switch (searchArea) {
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
