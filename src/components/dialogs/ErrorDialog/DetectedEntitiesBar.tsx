import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

const DetectedEntitiesBar = () => {
  const nodes = useImrStore((state) => state.imr.nodes);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const setDialogData = useGlobalStore((state) => state.setDialogData);
  const clearError = useGlobalStore((state) => state.clearError);

  const handleEntityClick = (id: number) => {
    toggleDialog("error", false);
    setTimeout(() => {
      clearError();
    }, 300);
    setDialogData("entityEditor", { id: id });
    toggleDialog("entityEditor");
  };

  return (
    <div className="flex gap-2">
      {nodes.map(({ id, name }, index) => (
        <Button key={index} onClick={() => handleEntityClick(id)}>
          <Pencil1Icon /> {name}
        </Button>
      ))}
    </div>
  );
};

export default DetectedEntitiesBar;
