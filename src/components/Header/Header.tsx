"use client";

import { SymbolIcon } from "@radix-ui/react-icons";
import React from "react";

import FilterDialog from "@/components/dialogs/FilterDialog";
import ImrDialog from "@/components/dialogs/ImrDialog";
import ActionsMenu from "@/components/menus/ActionsMenu";
import SettingsMenu from "@/components/menus/SettingsMenu";
import OSMQuerySubmit from "@/components/OSMQuerySubmit";
import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";

const Header = () => {
  const toggleStartScreen = useAppStore((state) => state.toggleStartScreen);

  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-between flex-1">
        <h1 className="pb-1 text-2xl font-bold leading-none">KID2 Spot</h1>
        <div className="flex gap-2">
          <Button onClick={() => toggleStartScreen()}>
            <SymbolIcon />
            <span className="hidden md:block">New Search</span>
          </Button>
          <OSMQuerySubmit />
          <FilterDialog />
          <ActionsMenu />
          <SettingsMenu />
          <ImrDialog />
        </div>
      </div>
    </div>
  );
};

export default Header;
