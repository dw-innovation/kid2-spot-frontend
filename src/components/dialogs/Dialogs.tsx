"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import ErrorDialog from "./ErrorDialog";
import FiltersDialog from "./FiltersDialog";
import ImrDialog from "./ImrDialog";
import LoadSessionDialog from "./LoadSessionDialog";
import QueryOSMDialog from "./QueryOSMDialog/QueryOSMDialog";
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
      <QueryOSMDialog />
    </>
  );
};

export default Dialogs;
