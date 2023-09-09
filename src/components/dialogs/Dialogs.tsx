"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import ErrorDialog from "./ErrorDialog";
import FiltersDialog from "./FiltersDialog";
import ImrDialog from "./ImrDialog";
import LoadSessionDialog from "./LoadSessionDialog";
import SaveSessionDialog from "./SaveSessionDialog";

const Dialogs = () => {
  return (
    <>
      <DownloadResultsDialog />
      <SaveSessionDialog />
      <LoadSessionDialog />
      <FiltersDialog />
      <ImrDialog />
      <ErrorDialog />
    </>
  );
};

export default Dialogs;
