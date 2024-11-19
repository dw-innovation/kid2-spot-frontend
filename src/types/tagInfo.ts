export interface TagInfoResponse {
  url: string;
  data_until: string;
  page: number;
  rp: number;
  total: number;
  data: TagInfo[];
}

export interface TagInfo {
  value: string;
  count: number;
  fraction: number;
  in_wiki: boolean;
  description: string;
  desclang: string;
  descdir: string;
}
