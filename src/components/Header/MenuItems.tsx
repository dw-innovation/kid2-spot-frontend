"use client";

import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";

import ActionsMenu from "@/components/menus/ActionsMenu";
import SettingsMenu from "@/components/menus/SettingsMenu";
import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";

const MenuItems = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <div className="flex flex-col items-end gap-2 md:flex-row">
      <ActionsMenu />
      <SettingsMenu />
      <Button onClick={() => toggleDialog("imr")} variant={"outline"}>
        <Pencil1Icon />
        <span>IMR</span>
      </Button>
    </div>
  );
};

export default MenuItems;
