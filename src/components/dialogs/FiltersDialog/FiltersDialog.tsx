import React from "react";

import useStrings from "@/lib/contexts/useStrings";

import Dialog from "../Dialog";
import Relations from "./relations/Relations";
import Sets from "./sets/Sets";

const DIALOG_NAME = "filters";

const FiltersDialog = () => {
  const { filtersDialogTitle } = useStrings();

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={filtersDialogTitle()}
      className="overflow-scroll sm:max-w-2xl"
    >
      <div className="flex flex-col flex-1 h-full gap-2 overflow-y-auto">
        <Sets />
        <Relations />
      </div>
    </Dialog>
  );
};

export default FiltersDialog;
