"use client";

import axios from "axios";
import { useState } from "react";

type FetchFunction<T = any> = (...args: any[]) => Promise<T>;
type ApiStatus = "idle" | "loading" | "success" | "error";

const useApiStatus = <T = any,>(
  fetchFunction: FetchFunction<T>
): [ApiStatus, (...args: any[]) => Promise<T | undefined>, () => void] => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const [controller, setController] = useState<AbortController | null>(null);

  const updateApiStatus = (status: ApiStatus): void => {
    setApiStatus(status);
  };

  const fetchData = async (...args: any[]): Promise<T | undefined> => {
    const abortController = new AbortController();
    setController(abortController);

    updateApiStatus("loading");

    try {
      const results = await fetchFunction(...args, {
        signal: abortController.signal,
      });

      updateApiStatus("success");

      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        updateApiStatus("idle");
        console.log("Fetch request cancelled");
      } else {
        console.error("Fetch request failed: ", error);
        updateApiStatus("error");
      }
    }
  };

  const cancelRequest = () => {
    if (controller) {
      controller.abort();
    }
  };

  return [apiStatus, fetchData, cancelRequest];
};

export default useApiStatus;
