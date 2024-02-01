import {
  BookmarkIcon,
  DownloadIcon,
  LightningBoltIcon,
  Share1Icon,
  UploadIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useMenu } from "@/components/Header/Context";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useStrings from "@/lib/contexts/useStrings";
import { saveSession } from "@/lib/sessions";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const ActionsMenu = () => {
  const {
    actionMenuTrigger,
    actionMenuSessionTitle,
    actionMenuShareSession,
    actionMenuSaveSession,
    actionMenuLoadSession,
    actionMenuResultsTitle,
    actionMenuDownloadResults,
  } = useStrings();

  const [open, setOpen] = useState(false);
  const { setOpen: setMenuOpen } = useMenu();
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const isGeoJSONAvailable = Boolean(geoJSON);

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const sessions = useSessionsStore((state) => state.sessions);
  const mutation = useMutation(
    () =>
      saveSession([
        { name: "useGlobalStore", getState: useGlobalStore.getState },
        { name: "useMapStore", getState: useMapStore.getState },
        { name: "useQueryStore", getState: useQueryStore.getState },
        { name: "useStreetViewStore", getState: useStreetViewStore.getState },
        { name: "useImrStore", getState: useImrStore.getState },
      ]),
    {
      onSuccess: (sessionLink) => {
        window.navigator.clipboard.writeText(sessionLink);
        toast.success("Session saved and share link copied to clipboard!");
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error("Error saving session: " + error.message);
        } else {
          toast.error("An unknown error occurred while saving the session");
        }
      },
    }
  );

  const ShareSessionIcon = mutation.isLoading ? (
    <LoadingSpinner />
  ) : (
    <Share1Icon />
  );

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        setMenuOpen(state);
      }}
    >
      <DropdownMenuTrigger asChild>
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
            mutation.mutate();
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
