import { useQuery } from "react-query";

import { TagInfoResponse } from "@/types/tagInfo";

import { fetchTagInfo } from "../apiServices";

type Props = {
  key: string;
  isEnabled: boolean;
};

const useTagInfo = ({ key, isEnabled }: Props) => {
  return useQuery([key], () => fetchTagInfo(key), {
    enabled: isEnabled,
    retry: false,
    select: (data: TagInfoResponse) => {
      if (!data) return [];
      if (data.total > 200) return [];
      return data.data.map((tag) => ({ label: tag.value, value: tag.value }));
    },
  });
};
export default useTagInfo;
