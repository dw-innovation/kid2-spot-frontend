import {
  BookmarkIcon,
  DownloadIcon,
  LightningBoltIcon,
  Share1Icon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";

import { useMenu } from "@/components/Header/Context";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import { saveResultsToFile } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const ActionsMenu = () => {
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const isGeoJSONAvailable = Boolean(geoJSON);
  const [open, setOpen] = useState(false);
  const { setOpen: setMenuOpen } = useMenu();

  const [apiStatus, triggerSaveData] = useApiStatus(() =>
    saveData([
      { name: "useAppStore", getState: useAppStore.getState },
      { name: "useMapStore", getState: useMapStore.getState },
      { name: "useQueryStore", getState: useQueryStore.getState },
      { name: "useStreetViewStore", getState: useStreetViewStore.getState },
      { name: "useImrStore", getState: useImrStore.getState },
    ])
  );

  const ShareSessionIcon =
    apiStatus === "loading" ? <LoadingSpinner /> : <Share1Icon />;

  const handleClearResults = () => {
    clearGeoJSON();
    setOpen(false);
    setMenuOpen(false);
  };

  const handleDownloadResults = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    format: "kml" | "geojson"
  ) => {
    e.preventDefault();
    saveResultsToFile(format);
    setOpen(false);
    setMenuOpen(false);
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        setMenuOpen(state);
      }}
    >
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <LightningBoltIcon />
          <span>Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">Session</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={async (e) => {
            e.preventDefault();
            triggerSaveData().then(() => {
              setOpen(false);
              setMenuOpen(false);
            });
          }}
        >
          {ShareSessionIcon}
          Share Session
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          <BookmarkIcon />
          Save Session
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          <UploadIcon />
          Load Session
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClearResults}
          disabled={!isGeoJSONAvailable}
        >
          <TrashIcon />
          Clear Results
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleDownloadResults(e, "geojson")}
          disabled={!isGeoJSONAvailable}
        >
          <DownloadIcon />
          Download Results (GeoJSON)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleDownloadResults(e, "kml")}
          disabled={!isGeoJSONAvailable}
        >
          <DownloadIcon />
          Download Results (KML)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
