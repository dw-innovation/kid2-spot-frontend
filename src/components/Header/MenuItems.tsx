"use client";

import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";

import ActionsMenu from "@/components/menus/ActionsMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";

const MenuItems = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <div className="flex flex-col items-end gap-2 md:flex-row">
      <ActionsMenu />
      <Button
        onClick={() => toggleDialog("imr")}
        variant={"outline"}
        className={cn(
          process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && "hidden"
        )}
      >
        <Pencil1Icon />
        <span>Query</span>
      </Button>
    </div>
  );
};

export default MenuItems;
