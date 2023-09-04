import { MixerVerticalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import { useMenu } from "@/components/Header/Context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Relations from "./relations/Relations";
import Sets from "./sets/Sets";

const FilterDialog = () => {
  const [open, setOpen] = useState(false);
  const { setOpen: setMenuOpen } = useMenu();

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        setMenuOpen(state);
      }}
    >
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button variant={"outline"}>
          <MixerVerticalIcon />
          <span>Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[10000] max-w-2xl flex flex-col max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Search Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 h-full gap-2 overflow-y-auto">
          <Sets />
          <Relations />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
