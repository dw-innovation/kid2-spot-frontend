import React from "react";

import useStrings from "@/lib/contexts/useStrings";
import { Session } from "@/types/stores/SessionsStore.interface";

interface SessionInfoProps {
  session: Session | undefined;
}

const SessionInfo: React.FC<SessionInfoProps> = ({ session }) => {
  const { loadSessionDialogSessionSavedInfo } = useStrings();
  return (
    <>
      {session?.created && (
        <p className="text-sm font-semibold text-muted-foreground">
          {loadSessionDialogSessionSavedInfo({
            date: new Date(session.created).toLocaleDateString(),
            time: new Date(session.created).toLocaleTimeString(),
          })}
        </p>
      )}
      {session?.description && (
        <p className="text-sm text-muted-foreground">{session.description}</p>
      )}
    </>
  );
};

export default SessionInfo;
