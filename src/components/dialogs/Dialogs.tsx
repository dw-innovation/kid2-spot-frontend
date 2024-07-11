"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import EntityEditor from "./EntityEditor";
import ErrorDialog from "./ErrorDialog";
import InfoDialog from "./InfoDialog";
import InputStepperDialog from "./InputStepperDialog";
import LoadSessionDialog from "./LoadSessionDialog";
import SaveSessionDialog from "./SaveSessionDialog";
import SpotQueryDialog from "./SpotQueryDialog";
import StepperErrorDialog from "./StepperErrorDialog";

const Dialogs = () => (
  <>
    <DownloadResultsDialog />
    <SaveSessionDialog />
    <LoadSessionDialog />
    <SpotQueryDialog />
    <ErrorDialog />
    <StepperErrorDialog />
    <InputStepperDialog />
    <InfoDialog />
    <EntityEditor />
  </>
);

export default Dialogs;
