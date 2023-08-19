"use client";

import { SymbolIcon } from "@radix-ui/react-icons";
import React from "react";

import useAppStore from "@/stores/useAppStore";

import ActionsMenu from "../ActionsMenu";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { Button } from "../ui/button";

const Header = () => {
  const toggleStartScreen = useAppStore((state) => state.toggleStartScreen);

  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-between flex-1">
        <h1 className="pb-1 text-2xl font-bold leading-none">
          KID2 Spot Prototype
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => toggleStartScreen()}>
            <SymbolIcon />
            Start Over
          </Button>
          <ActionsMenu />
          <SettingsMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
