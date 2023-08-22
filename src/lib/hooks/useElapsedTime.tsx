import { useEffect, useState } from "react";

const useElapsedTime = (interval = 1000) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setElapsedTime((prevTime) => prevTime + 1),
      interval
    );

    return () => clearInterval(timer);
  }, [interval]);

  return elapsedTime;
};

export default useElapsedTime;
