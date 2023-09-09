import React from "react";

import DynamicImrEditor from "@/components/ImrEditor";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "imr";

const ImrDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle="Edit IMR"
      dialogDescription="Manually edit the Intermediate Representation (IMR) of the query."
      className="sm:max-w-2xl"
    >
      <DynamicImrEditor setOpen={() => toggleDialog(DIALOG_NAME)} />
    </Dialog>
  );
};

export default ImrDialog;
