"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InputStepperContextType = {
  animateOut: boolean;
  setAnimateOut: Dispatch<SetStateAction<boolean>>;
};

const InputStepperContext = createContext<InputStepperContextType>({
  animateOut: false,
  setAnimateOut: () => {
    throw new Error(
      "setAnimateOut function must be overridden by the provider"
    );
  },
});

export const useInputStepper = () => {
  return useContext(InputStepperContext);
};

export const InputStepperProvider = ({ children }: { children: ReactNode }) => {
  const [animateOut, setAnimateOut] = useState(false);

  return (
    <InputStepperContext.Provider value={{ animateOut, setAnimateOut }}>
      {children}
    </InputStepperContext.Provider>
  );
};
