import tokml from "@jlandrum/tokml";
import { area } from "@turf/turf";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { MultiPolygon, Polygon } from "geojson";
import { LatLngLiteral } from "leaflet";
import { twMerge } from "tailwind-merge";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import { IntermediateRepresentation } from "@/types/imr";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fetchOSMData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<any> => {
  let imr = useImrStore.getState().imr;

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_OSM_API}/run-osm-query`,
    headers: {
      "Content-Type": "application/json",
    },
    data: imr,
    cancelToken: new axios.CancelToken((cancel) => {
      signal.addEventListener("abort", () => cancel());
    }),
  };

  try {
    const response = await axios(config);

    if (response.data.results.features.length === 0) {
      useGlobalStore.getState().setError("noResults");
      useGlobalStore.getState().toggleDialog("error");
    }

    response.data.results.features.length === 0 &&
      useGlobalStore.getState().setError("noResults");
    return response.data;
  } catch (error: any) {
    useGlobalStore.getState().setError(error.response.data.errorType);
    useGlobalStore.getState().toggleDialog("error");
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
        limit: 10,
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

export const saveResultsToFile = (format: "geojson" | "kml") => {
  let fileData = "";
  let geojson = useResultsStore.getState().geoJSON;

  if (!geojson) return;

  if (format === "geojson") {
    fileData = JSON.stringify(geojson);
  } else {
    let kml = tokml(geojson);
    fileData = kml;
  }
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `export.${format}`;
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

export const translateNLtoIMR = async (
  naturalLanguagePrompt: string
): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_NLP_API}/transform-sentence-to-imr`,
    data: {
      sentence: naturalLanguagePrompt,
    },
  });

  const result = await response.data;
  return result;
};

export const validateIMR = async (
  imr: IntermediateRepresentation
): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_OSM_API}/validate-imr`,
    data: imr,
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

export const getAreas = async (area: string): Promise<any> => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search.php",
    {
      params: {
        q: area,
        format: "json",
        polygon_geojson: 1,
        "accept-language": "en",
      },
    }
  );

  return response.data;
};

export const calculateSurface = (polgyon: Polygon | MultiPolygon): number => {
  if (polgyon.type !== "Polygon" && polgyon.type !== "MultiPolygon") {
    throw new Error("Input must be a Polygon");
  }
  return Math.round(area(polgyon) / 1000000);
};

type PrefixKeys<Obj extends Record<string, any>, Prefix extends string> = {
  [K in keyof Obj as `${Prefix}${Capitalize<string & K>}`]: Obj[K];
};

export const prefixKeys = <
  Obj extends Record<string, any>,
  Prefix extends string
>(
  obj: Obj,
  prefix: Prefix
): PrefixKeys<Obj, Prefix> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`,
      value,
    ])
  ) as PrefixKeys<Obj, Prefix>;
};
