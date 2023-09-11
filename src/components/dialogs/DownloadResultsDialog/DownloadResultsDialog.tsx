import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useString";
import { saveResultsToFile } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "downloadResults";

const DownloadDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const {
    downloadDialogTitle,
    downloadDialogDescription,
    downloadDialogInfo,
    downloadDialogAsGeoJSONButton,
    downloadDialogAsKMLButton,
  } = useStrings();

  const handleSaveClick = (format: "geojson" | "kml") => {
    saveResultsToFile(format);
    toggleDialog(DIALOG_NAME);
  };

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={downloadDialogTitle}
      dialogDescription={downloadDialogDescription}
    >
      {downloadDialogInfo}
      <div className="flex gap-2">
        <Button onClick={() => handleSaveClick("geojson")}>
          {downloadDialogAsGeoJSONButton}
        </Button>
        <Button onClick={() => handleSaveClick("kml")}>
          {downloadDialogAsKMLButton}
        </Button>
      </div>
    </Dialog>
  );
};

export default DownloadDialog;
