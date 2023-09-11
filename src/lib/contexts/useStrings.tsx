"use client";

import React, { createContext, ReactNode, useContext } from "react";

import { STRINGS } from "../const/strings";

type StringKeys = keyof typeof STRINGS;
type StringFunction = (values?: Record<string, string | number>) => string;

const replacePlaceholders = (
  str: string,
  values: Record<string, string | number> = {}
): string => {
  return Object.keys(values).reduce((acc, key) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), values[key].toString());
  }, str);
};

const wrapStrings = (
  strings: typeof STRINGS
): Record<StringKeys, StringFunction> => {
  return Object.fromEntries(
    Object.entries(strings).map(([key, value]) => {
      return [
        key,
        (values?: Record<string, string | number>) =>
          replacePlaceholders(value, values),
      ];
    })
  ) as Record<StringKeys, StringFunction>;
};

const wrappedStrings = wrapStrings(STRINGS);

interface StringProviderProps {
  children: ReactNode;
}

export const StringContext = createContext<
  Record<StringKeys, StringFunction> | undefined
>(undefined);

export const StringProvider: React.FC<StringProviderProps> = ({ children }) => {
  return (
    <StringContext.Provider value={wrappedStrings}>
      {children}
    </StringContext.Provider>
  );
};

export const useStrings = (): Record<StringKeys, StringFunction> => {
  const strings = useContext(StringContext);
  if (!strings) {
    throw new Error("useStrings must be used within a StringProvider");
  }
  return strings;
};
