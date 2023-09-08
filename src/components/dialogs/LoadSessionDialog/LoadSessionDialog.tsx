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
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeImrStore = useImrStore((state) => state.initialize);
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

    const { data } = session;

    data.useMapStore && initializeMapStore(data.useMapStore);
    data.useQueryStore && initializeQueryStore(data.useQueryStore);
    data.useStreetViewStore &&
      initializeStreetViewStore(data.useStreetViewStore);
    data.useImrStore && initializeImrStore(data.useImrStore);
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

      {selectedSession?.created && (
        <p className="text-sm font-semibold text-muted-foreground">
          Saved {selectedSession.created}
        </p>
      )}

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
