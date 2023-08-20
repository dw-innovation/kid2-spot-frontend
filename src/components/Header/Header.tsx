"use client";

import { MixerVerticalIcon, SymbolIcon } from "@radix-ui/react-icons";
import React from "react";

import useAppStore from "@/stores/useAppStore";

import ActionsMenu from "../ActionsMenu";
import ImrDialog from "../ImrDialog/ImrDialog";
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
            <span className="hidden md:block">New Search</span>
          </Button>
          <Button variant={"outline"}>
            <MixerVerticalIcon />
            <span className="hidden md:block">Filters</span>
          </Button>
          <ActionsMenu />
          <SettingsMenu />
          <ImrDialog />
        </div>
      </div>
    </div>
  );
};

export default Header;
