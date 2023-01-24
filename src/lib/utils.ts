import axios from "axios";
import useSessionStore from "src/stores/useSessionStore";

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
  let setResults = useSessionStore.getState().setResults;
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
      setResults(response.data.elements);
    })
    .catch((error) => {
      console.log(error);
    });
};
