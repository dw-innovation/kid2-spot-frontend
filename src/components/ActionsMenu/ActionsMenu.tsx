import { LightningBoltIcon, Share1Icon } from "@radix-ui/react-icons";
import { DownloadIcon, TrashIcon } from "lucide-react";
import React from "react";

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

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const ActionsMenu = () => {
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const geoJSON = useResultsStore((state) => state.geoJSON);

  const [apiStatus, triggerSaveData] = useApiStatus(() =>
    saveData([
      { name: "useAppStore", getState: useAppStore.getState },
      { name: "useMapStore", getState: useMapStore.getState },
      { name: "useQueryStore", getState: useQueryStore.getState },
      { name: "useStreetViewStore", getState: useStreetViewStore.getState },
    ])
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          <LightningBoltIcon />
          <span className="hidden md:block">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuItem onClick={() => triggerSaveData()}>
          {apiStatus === "loading" ? <LoadingSpinner /> : <Share1Icon />}
          Share Session
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => clearGeoJSON()}
          disabled={geoJSON ? false : true}
        >
          <TrashIcon size={20} />
          Clear Results
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => saveResultsToFile()}
          disabled={geoJSON ? false : true}
        >
          <DownloadIcon size={20} />
          Download Results
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
