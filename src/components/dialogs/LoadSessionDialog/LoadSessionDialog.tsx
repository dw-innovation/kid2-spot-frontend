import { JWT } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import React from "react";

import useLoadSessionState from "@/hooks/useLoadSessionState";
import useSessionActions from "@/hooks/useSessionActions";
import useStrings from "@/lib/contexts/useStrings";
import { loadSession } from "@/lib/sessions";
import { trackAction } from "@/lib/utils";
import { JWTSession } from "@/types/next-auth";

import Dialog from "../Dialog";
import SessionActions from "./SessionActions";
import SessionInfo from "./SessionInfo";
import SessionSelect from "./SessionSelect";

const DIALOG_NAME = "loadSession";

const LoadSessionDialog = () => {
  const { data: sessionData } = useSession();

  const authSession = sessionData as JWTSession;
  const { sessionId, setSessionId, options, selectedSession, findSessionById } =
    useLoadSessionState();

  const { removeSession } = useSessionActions();
  const { loadSessionDialogDescription, loadSessionDialogTitle } = useStrings();

  const handleLoadSession = async (sessionId: string | undefined) => {
    if (!sessionId) return;
    const session = findSessionById(sessionId);

    trackAction("session", "load", session?.name);

    if (!session) return;

    const { data } = session;

    await loadSession(data, (authSession?.user?.jwt as JWT) || "");
  };

  const handleRemoveSession = (sessionId: string | undefined) => {
    if (!sessionId) return;
    const session = findSessionById(sessionId);

    trackAction("session", "remove", session?.name);

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
        handleLoadSession={() => handleLoadSession(sessionId)}
        handleRemoveSession={() => handleRemoveSession(sessionId)}
      />
    </Dialog>
  );
};

export default LoadSessionDialog;
