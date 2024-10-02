import Dialog from "../Dialog";

const DIALOG_NAME = "maintenance";

const DownloadDialog = () => {
  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={"Maintenance"}
      dialogDescription={"SPOT is down due to maintenance"}
    >
      <p>We&apos;re currently working on SPOT. Please check back later.</p>
    </Dialog>
  );
};

export default DownloadDialog;
