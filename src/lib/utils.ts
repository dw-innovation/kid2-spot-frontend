import axios from "axios";
import useSessionStore from "@/stores/useSessionStore";

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

export const callOverpassAPI = async (): Promise<any> => {
  let setApiState = useSessionStore.getState().setApiState;
  setApiState("loading");

  let setMarkers = useSessionStore.getState().setMarkers;
  let bbox = useSessionStore.getState().bbox;
  let overpassQuery = useSessionStore.getState().overpassQuery;

  var config = {
    method: "get",
    url: process.env.NEXT_PUBLIC_OVERPASS_API_URL,
    params: {
      data: overpassQuery.replaceAll("{{bbox}}", bbox.join(",")),
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
  const address = useSessionStore.getState().searchAddress;
  const setAddressSuggestions = useSessionStore.getState().setAddressSuggestions;

  await axios
    .get("/api/geocode", {
      params: {
        address: address,
      },
    })
    .then((response) => {
      setAddressSuggestions(response.data);
    });
};
