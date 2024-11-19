"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MapAlertContextType {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const MapAlertContext = createContext<MapAlertContextType>({
  showAlert: false,
  setShowAlert: () => {
    throw new Error("setShowAlert function must be overridden by the provider");
  },
});

export const useMapAlert = () => {
  return useContext(MapAlertContext);
};

export const MapAlertProvider = ({ children }: { children: ReactNode }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <MapAlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </MapAlertContext.Provider>
  );
};
