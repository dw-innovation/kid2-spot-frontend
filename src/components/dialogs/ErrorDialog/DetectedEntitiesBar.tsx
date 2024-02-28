import { Pencil1Icon } from "@radix-ui/react-icons";
import { capitalize } from "lodash";
import React from "react";

import { Button } from "@/components/ui/button";
import { trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

const DetectedEntitiesBar = () => {
  const nodes = useImrStore((state) => state.imr.nodes);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleEntityClick = (id: number) => {
    trackAction("errorDialog", "entityEditor", `entity: ${id}`);
    setDialogData("entityEditor", { id: id });
    toggleDialog("entityEditor");
  };

  return (
    <div className="flex gap-2">
      {nodes.map(({ id, display_name }, index) => (
        <Button key={index} onClick={() => handleEntityClick(id)}>
          <Pencil1Icon /> {capitalize(display_name)}
        </Button>
      ))}
    </div>
  );
};

export default DetectedEntitiesBar;
