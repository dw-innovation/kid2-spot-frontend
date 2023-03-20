import { useCallback, useEffect, useState } from "react";

type CallbackFunction = () => void;

const useKeyPress = (
  targetKey: string,
  callback?: CallbackFunction
): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
        if (callback) {
          callback();
        }
      }
    },
    [targetKey, callback]
  );

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler, targetKey]);

  return keyPressed;
};

export default useKeyPress;
