import { useQuery } from "@tanstack/react-query";

import { TagInfoResponse } from "@/types/tagInfo";

import { fetchTagInfo } from "../apiServices";

type Props = {
  key: string;
  isEnabled: boolean;
};

type TransformedTagInfo = { label: string; value: string }[];

const useTagInfo = ({ key, isEnabled }: Props) => {
  return useQuery<TagInfoResponse, Error, TransformedTagInfo>({
    queryKey: [key],
    queryFn: () => fetchTagInfo(key),
    enabled: isEnabled,
    retry: false,
    select: (data: TagInfoResponse): TransformedTagInfo => {
      if (!data) return [];
      if (data.total > 200) return [];
      return data.data.map((tag) => ({ label: tag.value, value: tag.value }));
    },
  });
};

export default useTagInfo;
