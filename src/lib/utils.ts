import axios from "axios";
import { FeatureCollection } from "geojson";
import { LatLngLiteral } from "leaflet";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";

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
    return response.data;
  } catch (error) {
    console.log(error);
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

export const countFeaturesByPrefix = (
  featureCollection: FeatureCollection & { features: Array<{ id: string }> }
): Record<string, number> => {
  const counts: Record<string, number> = {
    nodes: 0,
    ways: 0,
    relations: 0,
  };
  if (!featureCollection) return counts;

  featureCollection.features.forEach(({ id }: { id: string }) => {
    const idPrefix = id.split("/")[0];

    if (idPrefix === "node") {
      counts.nodes++;
    } else if (idPrefix === "way") {
      counts.ways++;
    } else if (idPrefix === "relation") {
      counts.relations++;
    }
  });

  return counts;
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
