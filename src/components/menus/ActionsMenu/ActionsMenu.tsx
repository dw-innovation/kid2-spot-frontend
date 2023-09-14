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
import { useStrings } from "@/lib/contexts/useStrings";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { saveData } from "@/lib/storeData";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const ActionsMenu = () => {
  const {
    actionMenuTrigger,
    actionMenuClearResults,
    actionMenuDownloadResults,
    actionMenuLoadSession,
    actionMenuResultsTitle,
    actionMenuSaveSession,
    actionMenuShareSession,
    actionMenuSessionTitle,
  } = useStrings();
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);
  const clearSpots = useResultsStore((state) => state.clearSpots);
  const isGeoJSONAvailable = Boolean(geoJSON);
  const [open, setOpen] = useState(false);
  const { setOpen: setMenuOpen } = useMenu();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const sessions = useSessionsStore((state) => state.sessions);

  const [apiStatus, triggerSaveData] = useApiStatus(() =>
    saveData([
      { name: "useGlobalStore", getState: useGlobalStore.getState },
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
    clearSets();
    clearSpots();
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
          <span>{actionMenuTrigger()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel className="uppercase">
          {actionMenuSessionTitle()}
        </DropdownMenuLabel>
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
          {actionMenuShareSession()}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleDialog("saveSession")}>
          <BookmarkIcon />
          {actionMenuSaveSession()}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleDialog("loadSession")}
          disabled={sessions.length === 0}
        >
          <UploadIcon />
          {actionMenuLoadSession()}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="uppercase">
          {actionMenuResultsTitle()}
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleClearResults}
          disabled={!isGeoJSONAvailable}
        >
          <TrashIcon />
          {actionMenuClearResults()}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toggleDialog("downloadResults");
          }}
          disabled={!isGeoJSONAvailable}
        >
          <DownloadIcon />
          {actionMenuDownloadResults()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
