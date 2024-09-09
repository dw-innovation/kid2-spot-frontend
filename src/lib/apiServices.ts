import axios from "axios";

import { SpotQuery } from "@/types/spotQuery";

export const fetchOSMData = async ({
  spotQuery,
}: {
  spotQuery: SpotQuery;
}): Promise<any> => {
  try {
    const response = await axios.post("/api/queryOSM", spotQuery);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    console.error("Error fetching OSM data:", error);
    throw error;
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

export const fetchNLToSpotQueryTransformation = async (
  naturalLanguagePrompt: string
): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/transformSentence`,
      data: {
        sentence: naturalLanguagePrompt,
      },
    });

    const result = await response.data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data.message;
      if (serverError) {
        throw new Error(serverError);
      }
    } else {
      throw new Error("UnknownError");
    }
  }
};

export const validateSpotQuery = async (spotQuery: SpotQuery): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/validateQuery`,
      data: spotQuery,
    });

    return response.data;
  } catch (error) {
    throw new Error("spotQueryInvalid");
  }
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

const fetchOSMValues = async (
  key: string,
  page: number,
  resultsPerPage: number
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TAG_INFO_API}/key/values`,
    {
      params: {
        key,
        page,
        rp: resultsPerPage,
        sortname: "count_ways",
        sortorder: "desc",
      },
    }
  );
  return response.data;
};

export const getOSMValueOptions = async (key: string) => {
  const resultsPerPage = 999;

  const initialData = await fetchOSMValues(key, 1, resultsPerPage);

  let options = initialData.data.map((option: any) => ({
    label: option.value,
    value: option.value,
  }));

  return options;
};

export const fetchTagInfo = async (key: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TAG_INFO_API}/key/values`,
    {
      params: {
        key,
        rp: 200,
        sortname: "count_all",
        sortorder: "desc",
      },
    }
  );
  return response.data;
};
