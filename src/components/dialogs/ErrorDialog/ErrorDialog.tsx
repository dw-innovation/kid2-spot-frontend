import React from "react";

import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "error";

const ErrorDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle="Error">
      ErrorDialog
      <Button onClick={() => toggleDialog(DIALOG_NAME)}>Close Message</Button>
    </Dialog>
  );
};

export default ErrorDialog;
