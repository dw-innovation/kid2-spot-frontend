import produce from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import SessionsStore, {
  Session,
} from "../types/stores/SessionsStore.interface";

const useSessionsStore = create<SessionsStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session: Session) => {
        set(
          produce((draft) => {
            draft.sessions.push(session);
          })
        );
      },
      removeSession: (id: string) => {
        set(
          produce((draft) => {
            draft.sessions = draft.sessions.filter(
              (session: Session) => session.id !== id
            );
          })
        );
      },
      updateSession: (session: Session) => {
        set(
          produce((draft) => {
            const index = draft.sessions.findIndex(
              (s: Session) => s.id === session.id
            );
            if (index !== -1) {
              draft.sessions[index] = session;
            }
          })
        );
      },
      clearSessions: () => {
        set(
          produce((draft) => {
            draft.sessions = [];
          })
        );
      },
    }),
    {
      name: "spot-sessions",
    }
  )
);

export default useSessionsStore;
