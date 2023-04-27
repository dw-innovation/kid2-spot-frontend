import axios from "axios";
import { LatLngLiteral } from "leaflet";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";

const substituteAreaInQuery = (query: string): string => {
  const searchArea = useQueryStore.getState().searchArea;
  const areaBuffer = useQueryStore.getState().areaBuffer;
  let bounds = useMapStore.getState().bounds;
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
      area = bounds.flatMap((innerArray) => innerArray).join(",");
      break;
  }

  return query.replaceAll("{{bbox}}", area);
};

export const fetchOverpassApiData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<any> => {
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
    cancelToken: new axios.CancelToken((cancel) => {
      signal.addEventListener("abort", () => cancel());
    }),
  };

  try {
    const response = await axios(config);
    setApiState("idle");
    return response.data;
  } catch (error) {
    console.log(error);
    setApiState("error");
    return null;
  }
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
  let results = useResultsStore.getState().geoJSON;
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

export const fetchOverpassQuery = async (jsonQuery: string): Promise<any> => {
  if (!jsonQuery || !JSON.parse(jsonQuery)) return;

  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_OP_API}/translate_from_dict_to_op`,
    data: JSON.parse(jsonQuery),
  });

  const result = await response.data;
  return result;
};
