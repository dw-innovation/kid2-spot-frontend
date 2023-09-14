import React from "react";

import { useStrings } from "@/lib/contexts/useStrings";

import Dialog from "../Dialog";

const DIALOG_NAME = "queryOSM";

const QueryOSMDialog = () => {
  const { queryOSMDialogTitle, queryOSMDialogDescription } = useStrings();

  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle={queryOSMDialogTitle()}>
      {queryOSMDialogDescription()}
    </Dialog>
  );
};

export default QueryOSMDialog;
