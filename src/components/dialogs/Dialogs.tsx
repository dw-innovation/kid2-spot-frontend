"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
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
    </>
  );
};

export default Dialogs;
