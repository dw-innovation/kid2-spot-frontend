"use client";

import DownloadResultsDialog from "./DownloadResultsDialog";
import EntityEditor from "./EntityEditor";
import ErrorDialog from "./ErrorDialog";
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
    <ImrDialog />
    <ErrorDialog />
    <StepperErrorDialog />
    <QueryOSMDialog />
    <InputStepperDialog />
    <InfoDialog />
    <EntityEditor />
  </>
);

export default Dialogs;
