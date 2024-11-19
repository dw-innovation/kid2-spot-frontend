import React from "react";

import { Button } from "@/components/ui/button";
import useStrings from "@/lib/contexts/useStrings";
import { Session } from "@/types/stores/SessionsStore.interface";

interface SessionActionsProps {
  selectedSession: Session | undefined;
  handleLoadSession: () => void;
  handleRemoveSession: () => void;
}

const SessionActions: React.FC<SessionActionsProps> = ({
  selectedSession,
  handleLoadSession,
  handleRemoveSession,
}) => {
  const {
    loadSessionDialogLoadSessionButton,
    loadSessionDialogRemoveSessionButton,
  } = useStrings();

  return (
    <div className="flex w-full gap-2 ">
      <Button
        onClick={handleLoadSession}
        disabled={!selectedSession}
        className="flex-1"
      >
        {loadSessionDialogLoadSessionButton()}
      </Button>

      <Button
        onClick={handleRemoveSession}
        variant={"destructive"}
        disabled={!selectedSession}
        className="flex-1"
      >
        {loadSessionDialogRemoveSessionButton()}
      </Button>
    </div>
  );
};

export default SessionActions;
