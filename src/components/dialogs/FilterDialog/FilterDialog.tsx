import { MixerVerticalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

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

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button variant={"outline"}>
          <MixerVerticalIcon />
          <span className="hidden md:block">Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[10000] max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Search Filters</DialogTitle>
        </DialogHeader>
        <Sets />
        <Relations />
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
