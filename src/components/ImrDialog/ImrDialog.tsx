import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import DynamicImrEditor from "@/components/ImrEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

const ImrDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button variant={"outline"}>
          <Pencil1Icon />
          <span className="hidden md:block">IMR</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="z-[10000]"
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Edit Intermediate Representation</DialogTitle>
          <div className="w-full h-full min-h-[32rem]">
            <DynamicImrEditor setOpen={setOpen} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImrDialog;
