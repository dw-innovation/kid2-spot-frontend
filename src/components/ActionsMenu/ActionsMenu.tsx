import { LightningBoltIcon } from "@radix-ui/react-icons";
import { DownloadIcon, TrashIcon } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { saveResultsToFile } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import ShareButton from "../ShareButton";
import { Button } from "../ui/button";

const ActionsMenu = () => {
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const geoJSON = useResultsStore((state) => state.geoJSON);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          <LightningBoltIcon />
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000]">
        <DropdownMenuLabel>
          <ShareButton />
        </DropdownMenuLabel>
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
