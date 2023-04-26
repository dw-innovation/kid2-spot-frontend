import { useState } from "react";

type FetchFunction<T = any> = (...args: any[]) => Promise<T>;
type ApiStatus = "idle" | "loading" | "success" | "error";

const useApiStatus = <T = any>(
  fetchFunction: FetchFunction<T>
): [ApiStatus, (...args: any[]) => Promise<T | undefined>] => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");

  const updateApiStatus = (status: ApiStatus): void => {
    setApiStatus(status);
  };

  const fetchData = async (...args: any[]): Promise<T | undefined> => {
    updateApiStatus("loading");
    try {
      const results = await fetchFunction(...args);

      if (results) {
        updateApiStatus("success");
      } else {
        updateApiStatus("error");
      }
      return results;
    } catch (error) {
      console.error(error);
      updateApiStatus("error");
    }
  };

  return [apiStatus, fetchData];
};

export default useApiStatus;
