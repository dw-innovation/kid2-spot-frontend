import React from "react";

import useLoadSessionState from "@/hooks/useLoadSessionState";
import useSessionActions from "@/hooks/useSessionActions";
import useStrings from "@/lib/contexts/useStrings";
import { loadSession } from "@/lib/sessions";

import Dialog from "../Dialog";
import SessionActions from "./SessionActions";
import SessionInfo from "./SessionInfo";
import SessionSelect from "./SessionSelect";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const { sessionId, setSessionId, options, selectedSession, findSessionById } =
    useLoadSessionState();
  const { removeSession } = useSessionActions();
  const { loadSessionDialogDescription, loadSessionDialogTitle } = useStrings();

  const handleLoadSession = async () => {
    if (!sessionId) return;
    const session = findSessionById(sessionId);
    if (!session) return;

    const { data } = session;

    await loadSession(data);
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
