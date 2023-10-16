import axios from "axios";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import { IntermediateRepresentation } from "@/types/imr";

export const fetchOSMData = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<any> => {
  let imr = useImrStore.getState().imr;

  var config: any = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_OSM_API}/run-osm-query`,
    headers: {
      "Content-Type": "application/json",
    },
    data: imr,
  };

  if (signal) {
    config.cancelToken = new axios.CancelToken((cancel) => {
      signal.addEventListener("abort", () => cancel());
    });
  }

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
    process.env.NEXT_PUBLIC_NOMINATIM_API || "",
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

export const getSession = async (id: string) => {
  const auth = process.env.HTTP_BASIC_AUTH?.split(":") || [];
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSession`,
    {
      params: {
        id: id,
      },
      auth: {
        username: auth[0] || "",
        password: auth[1] || "",
      },
    }
  );
  return { props: { data: res.data.data } };
};

export const getOSMValueOptions = async (key: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_TAG_INFO_API}/key/values`,
    {
      params: {
        key: key,
        page: 1,
        rp: 100,
        sortname: "count_ways",
        sortorder: "desc",
      },
    }
  );
  let options = res.data.data.map((option: any) => ({
    label: option.value,
    value: option.value,
  }));
  return options;
};
