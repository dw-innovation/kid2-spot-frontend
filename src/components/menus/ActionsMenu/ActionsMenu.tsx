import {
  DownloadIcon,
  LightningBoltIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";

import { useMenu } from "@/components/Header/Context";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import { saveResultsToFile } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
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
    ])
  );

  const ShareSessionIcon =
    apiStatus === "loading" ? <LoadingSpinner /> : <Share1Icon />;

  const handleClearResults = () => {
    clearGeoJSON();
    setOpen(false);
    setMenuOpen(false);
  };

  const handleDownloadResults = () => {
    saveResultsToFile();
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClearResults}
          disabled={!isGeoJSONAvailable}
        >
          <TrashIcon />
          Clear Results
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDownloadResults}
          disabled={!isGeoJSONAvailable}
        >
          <DownloadIcon />
          Download Results
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
