import React from "react";

import { useStrings } from "@/lib/contexts/useStrings";

import Dialog from "../Dialog";
import { useLoadSessionState } from "./hooks/useLoadSessionState";
import { useSessionActions } from "./hooks/useSessionActions";
import SessionActions from "./SessionActions";
import SessionInfo from "./SessionInfo";
import SessionSelect from "./SessionSelect";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const { sessionId, setSessionId, options, selectedSession, findSessionById } =
    useLoadSessionState();
  const {
    initializeMapStore,
    initializeQueryStore,
    initializeStreetViewStore,
    initializeImrStore,
    toggleDialog,
    clearGeoJSON,
    clearSets,
    clearSpots,
    removeSession,
  } = useSessionActions();
  const { loadSessionDialogDescription, loadSessionDialogTitle } = useStrings();

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
    setSessionId("");
  };

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={loadSessionDialogTitle()}
      dialogDescription={loadSessionDialogDescription()}
    >
      <SessionSelect
        options={options}
        value={sessionId}
        onSelect={(value) => setSessionId(value)}
      />
      <SessionInfo session={selectedSession} />
      <SessionActions
        selectedSession={selectedSession}
        handleLoadSession={handleLoadSession}
        handleRemoveSession={handleRemoveSession}
      />
    </Dialog>
  );
};

export default LoadSessionDialog;
