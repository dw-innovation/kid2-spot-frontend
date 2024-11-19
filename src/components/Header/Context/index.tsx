"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MenuContextType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextType>({
  open: false,
  setOpen: () => {
    throw new Error("setOpen function must be overridden by the provider");
  },
});

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const conditionalSetOpen: Dispatch<SetStateAction<boolean>> = (value) => {
    if (window.innerWidth < 768) {
      setOpen(value);
    }
  };

  return (
    <MenuContext.Provider value={{ open, setOpen: conditionalSetOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
