import { useEffect, useRef, useState } from "react";

type ApiStatus = "idle" | "loading" | "success" | "error";

const useElapsedTime = (start: boolean, resetTrigger: ApiStatus): number => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const resetRef = useRef<ApiStatus>(resetTrigger);

  useEffect(() => {
    if (resetTrigger !== resetRef.current) {
      setElapsedTime(0);
      resetRef.current = resetTrigger;
    }
  }, [resetTrigger]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (start) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start]);

  return elapsedTime;
};

export default useElapsedTime;
