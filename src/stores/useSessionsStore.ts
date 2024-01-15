import { create } from "zustand";
import { persist } from "zustand/middleware";

import SessionsStore from "@/types/stores/SessionsStore.interface";

const useSessionsStore = create<SessionsStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({ sessions: { ...state.sessions, session } })),
      removeSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
        })),

      updateSession: (session) =>
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
