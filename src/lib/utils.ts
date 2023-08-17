import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { LatLngLiteral } from "leaflet";
import { twMerge } from "tailwind-merge";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const substituteAreaInQuery = (query: string): string => {
  const searchArea = useQueryStore.getState().searchArea;
  const searchAreaBuffer = useQueryStore.getState().searchAreaBuffer;
  let bounds = useMapStore.getState().bounds;
  let customSearchArea = useCustomSearchAreaStore.getState().customSearchArea;

  let area = "";

  switch (searchArea) {
    case "polygon":
      let enlargedPolygon = expandPolygonByDistance(
        customSearchArea,
        searchAreaBuffer
      );
      let polygonAreaString = enlargedPolygon
        .map((point: number[]) => `${point[0]} ${point[1]}`)
        .join(" ");
      area = `poly: "${polygonAreaString}"`;
      break;

    default:
      area = bounds.flatMap((innerArray) => innerArray).join(",");
      break;
  }

  return query.replaceAll("{{bbox}}", area);
};

export const fetchOSMData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<any> => {
  let imr = useQueryStore.getState().imr;
  let imrWithArea = substituteAreaInQuery(imr);

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_OSM_API}/run-osm-query`,
    headers: {
      "Content-Type": "application/json",
    },
    data: imrWithArea,
    cancelToken: new axios.CancelToken((cancel) => {
      signal.addEventListener("abort", () => cancel());
    }),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchGeocodeApiData = async (address: string): Promise<any> => {
  if (!address) return;

  try {
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
  } catch (e) {
    console.log(e);
    return null;
  }
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
  let imr = useQueryStore.getState().imr;
  const blob = new Blob([imr], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "imr.txt";
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

export const fetchImrFromNL = async (
  naturalLanguagePrompt: string
): Promise<any> => {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_OP_API}/translate_from_nl_to_imr`,
    params: {
      sentence: naturalLanguagePrompt,
    },
  });

  const result = await response.data;
  return result;
};

export const checkInputType = (input: string): "address" | "coordinates" => {
  // DMS (Degrees, Minutes, Seconds) format: 40° 26' 46" N 79° 58' 56" W
  const dmsRegex =
    /^(\d{1,3}°\s\d{1,2}'\s\d{1,2}(\.\d+)?["]\s[N|S])\s+(\d{1,3}°\s\d{1,2}'\s\d{1,2}(\.\d+)?["]\s[E|W])$/;

  // DM (Degrees, Minutes) format: 40° 26.767' N 79° 58.933' W
  const dmRegex =
    /^(\d{1,3}°\s\d{1,2}(\.\d+)?'\s[N|S])\s+(\d{1,3}°\s\d{1,2}(\.\d+)?'\s[E|W])$/;

  // DD (Decimal Degrees) format: 40.446195, -79.948862
  const ddRegex = /^(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)$/;

  if (dmsRegex.test(input) || dmRegex.test(input) || ddRegex.test(input)) {
    return "coordinates";
  }

  return "address";
};

export const injectArea = (imr: any): any => {
  if (imr.a.type === "bbox" || imr.a.type === "polygon") {
    return imr;
  }
};
