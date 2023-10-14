"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import EntityFilters from "./EntityFilters";
import ErrorDialog from "./ErrorDialog";
import FiltersDialog from "./FiltersDialog";
import ImrDialog from "./ImrDialog";
import InfoDialog from "./InfoDialog";
import InputStepperDialog from "./InputStepperDialog";
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
    <InputStepperDialog />
    <InfoDialog />
    <EntityFilters />
  </>
);

export default Dialogs;
