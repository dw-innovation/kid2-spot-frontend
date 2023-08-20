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

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger onClick={() => setOpen(true)}>
          <Button variant={"outline"}>
            <Pencil1Icon />
            IMR
          </Button>
        </DialogTrigger>
        <DialogContent
          className="z-[10000]"
          onInteractOutside={() => setOpen(false)}
          onEscapeKeyDown={() => setOpen(false)}
          onCloseAutoFocus={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Intermediate Representation</DialogTitle>
            <div className="w-full h-full min-h-[32rem]">
              <DynamicImrEditor setOpen={setOpen} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImrDialog;
