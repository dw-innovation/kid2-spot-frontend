import { create } from "zustand";
import { persist } from "zustand/middleware";

import SessionsStore, { Session } from "@/types/stores/SessionsStore.interface";

const useSessionsStore = create<SessionsStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session: Session) =>
        set((state) => ({ sessions: { ...state.sessions, session } })),
      removeSession: (id: string) =>
        set((state) => ({
          sessions: state.sessions.filter(
            (session: Session) => session.id !== id
          ),
        })),

      updateSession: (session: Session) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === session.id ? session : s
          ),
        })),
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: "spot-sessions",
    }
  )
);

export default useSessionsStore;
