"use client";

import { SymbolIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

import FilterDialog from "@/components/dialogs/FilterDialog";
import ImrDialog from "@/components/dialogs/ImrDialog";
import ActionsMenu from "@/components/menus/ActionsMenu";
import SettingsMenu from "@/components/menus/SettingsMenu";
import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";

import { useMenu } from "./Context";

const MenuItems = () => {
  const resetSteps = useAppStore((state) => state.resetSteps);
  const router = useRouter();
  const { setOpen } = useMenu();

  return (
    <div className="flex flex-col items-end gap-2 md:flex-row">
      <Button
        onClick={() => {
          resetSteps();
          router.push("/");
          setOpen(false);
        }}
      >
        <SymbolIcon />
        <span>New Search</span>
      </Button>
      <FilterDialog />
      <ActionsMenu />
      <SettingsMenu />
      <ImrDialog />
    </div>
  );
};

export default MenuItems;
