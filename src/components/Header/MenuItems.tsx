"use client";

import { Pencil1Icon, SymbolIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

import ActionsMenu from "@/components/menus/ActionsMenu";
import SettingsMenu from "@/components/menus/SettingsMenu";
import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

import { useMenu } from "./Context";

const MenuItems = () => {
  const resetSteps = useGlobalStore((state) => state.resetSteps);
  const router = useRouter();
  const { setOpen } = useMenu();
  const { commonNewSearchButton } = useStrings();

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <div className="flex flex-col items-end gap-2 md:flex-row">
      <ActionsMenu />
      <SettingsMenu />
      <Button onClick={() => toggleDialog("imr")} variant={"outline"}>
        <Pencil1Icon />
        <span>IMR</span>
      </Button>
      <Button
        onClick={() => {
          resetSteps();
          router.push("/");
          setOpen(false);
        }}
      >
        <SymbolIcon />
        <span>{commonNewSearchButton()}</span>
      </Button>
    </div>
  );
};

export default MenuItems;
