import { MixerVerticalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import QuerySets from "./QuerySets/QuerySets";

const FilterDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button variant={"outline"}>
          <MixerVerticalIcon />
          <span className="hidden md:block">Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="z-[10000]"
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Edit Search Filters</DialogTitle>
          <QuerySets />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
