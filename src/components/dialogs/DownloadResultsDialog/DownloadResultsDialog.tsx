import { Button } from "@/components/ui/button";
import { saveResultsToFile } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "downloadResults";

const DownloadDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);

  const handleSaveClick = (format: "geojson" | "kml") => {
    saveResultsToFile(format);
    toggleDialog(DIALOG_NAME);
  };

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle="Download Query Results"
      dialogDescription="Save your results locally as GeoJSON or KML file."
    >
      Settings TBD, for now just download as GeoJSON or KML could be filename,
      description, etc
      <div className="flex gap-2">
        <Button onClick={() => handleSaveClick("geojson")}>
          Download as GeoJSON
        </Button>
        <Button onClick={() => handleSaveClick("kml")}>Download as KML</Button>
      </div>
    </Dialog>
  );
};

export default DownloadDialog;
