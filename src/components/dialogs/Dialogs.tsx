"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import LoadSessionDialog from "./LoadSessionDialog";
import SaveSessionDialog from "./SaveSessionDialog";

const Dialogs = () => {
  return (
    <>
      <DownloadResultsDialog />
      <SaveSessionDialog />
      <LoadSessionDialog />
    </>
  );
};

export default Dialogs;
