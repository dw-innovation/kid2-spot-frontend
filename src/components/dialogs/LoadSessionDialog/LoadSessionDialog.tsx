import React, { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppStore from "@/stores/useAppStore";
import useSessionsStore from "@/stores/useSessionsStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const sessions = useSessionsStore((state) => state.sessions);
  const [sessionId, setSessionId] = React.useState("");

  const findSessionById = useCallback(
    (id: string) => sessions.find((s) => s.id === id),
    [sessions]
  );

  const handleLoadSession = (id: string) => {
    const session = findSessionById(id);
    if (!session) return;

    console.log(session);
    toggleDialog(DIALOG_NAME);
  };

  const selectedSession = findSessionById(sessionId);

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle="Load current session"
      dialogDescription="Load a saved session from your browser."
    >
      <Select onValueChange={setSessionId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a session" />
        </SelectTrigger>
        <SelectContent className="z-[20000]">
          <SelectGroup>
            {sessions.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedSession?.description && (
        <p className="text-sm text-muted-foreground">
          {selectedSession.description}
        </p>
      )}

      <div className="flex gap-2">
        <Button onClick={() => handleLoadSession(sessionId)}>
          Load session
        </Button>
      </div>
    </Dialog>
  );
};

export default LoadSessionDialog;
