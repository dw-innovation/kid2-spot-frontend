"use client";

import React, { createContext, ReactNode, useContext } from "react";

import { STRINGS } from "../const/strings";

type Strings = typeof STRINGS;

interface StringProviderProps {
  children: ReactNode;
}

export const StringContext = createContext<Strings | undefined>(undefined);

export const StringProvider: React.FC<StringProviderProps> = ({ children }) => (
  <StringContext.Provider value={STRINGS}>{children}</StringContext.Provider>
);

export const useStrings = (): Strings => {
  const strings = useContext(StringContext);
  if (!strings) {
    throw new Error("useStrings must be used within a StringProvider");
  }
  return strings;
};
