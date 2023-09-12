import React from "react";

import Dialog from "../Dialog";
import Relations from "./relations/Relations";
import Sets from "./sets/Sets";

const DIALOG_NAME = "filters";

const FiltersDialog = () => {
  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle="Advanced Search Filters"
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
