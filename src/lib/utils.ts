import axios from "axios";
import { LatLng } from "leaflet";

import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

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

export const transformBbox = (bbox: Bounds): number[] => {
  return [
    bbox._southWest.lat,
    bbox._southWest.lng,
    bbox._northEast.lat,
    bbox._northEast.lng,
  ];
};

const replaceWithArea = (query: string): string => {
  const queryArea = useQueryStore.getState().queryArea;
  let bbox = useMapStore.getState().bbox;
  let polygon = useMapStore.getState().polygon;

  let area = "";
  switch (queryArea) {
    case "bbox":
      let area = bbox.join(",");
      break;

    case "polygon":
      let polygonString = polygon
        .map((point: number[]) => `${point[0]},${point[1]}`)
        .join(" ");
      area = `(${polygonString})`;
      break;

    default:
      area = "360,-180,360,180";
      break;
  }

  return query.replaceAll("{{area}}", area);
};

export const callOverpassAPI = async (): Promise<any> => {
  let setApiState = useAppStore.getState().setApiState;
  setApiState("loading");

  let setMarkers = useMapStore.getState().setMarkers;
  let overpassQuery = useQueryStore.getState().overpassQuery;
  let overpassQueryWithArea = replaceWithArea(overpassQuery);

  var config = {
    method: "get",
    url: process.env.NEXT_PUBLIC_OVERPASS_API_URL,
    params: {
      data: overpassQueryWithArea,
    },
  };

  axios(config)
    .then((response) => {
      setMarkers(response.data.elements);
      setApiState("idle");
    })
    .catch((error) => {
      console.log(error);
      setApiState("error");
    });
};

export const callGeocodeAPI = async (): Promise<any> => {
  const address = useAddressStore.getState().searchAddress;
  const setAddressSuggestions =
    useAddressStore.getState().setAddressSuggestions;

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
  setAddressSuggestions(features);
};

export const exportMarkers = () => {
  let markers = useMapStore.getState().markers;
  const fileData = JSON.stringify(markers);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "export.json";
  link.href = url;
  link.click();
};

export const getFlyToAnimationSpeed = (
  currentMapCenter: LatLng,
  nextMapCenter: LatLng
): number => {
  const distance = currentMapCenter.distanceTo(nextMapCenter) / 5000;
  return Math.log(distance) + 1;
};

export const exportQuery = () => {
  let overpassQuery = useQueryStore.getState().overpassQuery;
  const blob = new Blob([overpassQuery], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "overpassQuery.txt";
  link.href = url;
  link.click();
};
