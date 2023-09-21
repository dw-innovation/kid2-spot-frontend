import axios from "axios";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import { IntermediateRepresentation } from "@/types/imr";

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
    error.response.data.error &&
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

export const fetchNLToIMRTransformation = async (
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

export const fetchIMRValidation = async (
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

export const fetchAreas = async (area: string): Promise<any> => {
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
