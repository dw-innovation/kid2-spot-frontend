import React, { useCallback, useEffect, useState } from "react";

import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useStrings";
import { Session } from "@/stores/interfaces/SessionsStore.interface";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useResultsStore from "@/stores/useResultsStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const {
    loadSessionDialogDescription,
    loadSessionDialogLoadSessionButton,
    loadSessionDialogRemoveSessionButton,
    loadSessionDialogTitle,
    loadSessionDialogSessionSavedInfo,
  } = useStrings();
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );
  const initializeImrStore = useImrStore((state) => state.initialize);
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);
  const clearSpots = useResultsStore((state) => state.clearSpots);
  const removeSession = useSessionsStore((state) => state.removeSession);
  const sessions = useSessionsStore((state) => state.sessions);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const findSessionById = useCallback(
    (id: string): Session | undefined => sessions.find((s) => s.id === id),
    [sessions]
  );

  const handleLoadSession = () => {
    if (!sessionId) return;
    const session = findSessionById(sessionId);
    if (!session) return;

    const { data } = session;

    clearGeoJSON();
    clearSets();
    clearSpots();

    data.useMapStore && initializeMapStore(data.useMapStore);
    data.useQueryStore && initializeQueryStore(data.useQueryStore);
    data.useStreetViewStore &&
      initializeStreetViewStore(data.useStreetViewStore);
    data.useImrStore && initializeImrStore(data.useImrStore);
    toggleDialog(DIALOG_NAME);
  };

  const handleRemoveSession = () => {
    if (!sessionId) return;
    const session = findSessionById(sessionId);
    if (!session) return;
    removeSession(sessionId);
  };

  const selectedSession = sessionId ? findSessionById(sessionId) : undefined;

  useEffect(() => {
    let availableOptions = sessions.map((session) => ({
      value: session.id,
      label: session.name,
    }));
    setOptions(availableOptions);
  }, [sessions]);

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={loadSessionDialogTitle()}
      dialogDescription={loadSessionDialogDescription()}
    >
      <Select
        options={options}
        defaultValue={options[0]}
        value={sessionId || ""}
        onSelect={(value) => setSessionId(value)}
        className="max-w-full"
        placeholder="Select a Session"
      />

      {selectedSession?.created && (
        <p className="text-sm font-semibold text-muted-foreground">
          {loadSessionDialogSessionSavedInfo({
            date: selectedSession.created,
          })}
        </p>
      )}

      {selectedSession?.description && (
        <p className="text-sm text-muted-foreground">
          {selectedSession.description}
        </p>
      )}

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
    </Dialog>
  );
};

export default LoadSessionDialog;
