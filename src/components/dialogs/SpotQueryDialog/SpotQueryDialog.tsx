import React from "react";

import DynamicSpotQueryEditor from "@/components/SpotQueryEditor";
import useStrings from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "spotQuery";

const SpotQueryDialog = () => {
  const { spotQueryDialogTitle, spotQueryDialogDescription } = useStrings();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={spotQueryDialogTitle()}
      dialogDescription={spotQueryDialogDescription()}
      className="sm:max-w-2xl"
    >
      <DynamicSpotQueryEditor setOpen={() => toggleDialog(DIALOG_NAME)} />
    </Dialog>
  );
};

export default SpotQueryDialog;
