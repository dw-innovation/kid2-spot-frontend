"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import ErrorDialog from "./ErrorDialog";
import FiltersDialog from "./FiltersDialog";
import ImrDialog from "./ImrDialog";
import LoadSessionDialog from "./LoadSessionDialog";
import QueryOSMDialog from "./QueryOSMDialog/QueryOSMDialog";
import SaveSessionDialog from "./SaveSessionDialog";
import StepperErrorDialog from "./StepperErrorDialog";

const Dialogs = () => (
  <>
    <DownloadResultsDialog />
    <SaveSessionDialog />
    <LoadSessionDialog />
    <FiltersDialog />
    <ImrDialog />
    <ErrorDialog />
    <StepperErrorDialog />
    <QueryOSMDialog />
  </>
);

export default Dialogs;
