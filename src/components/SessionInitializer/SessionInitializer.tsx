"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { loadSession } from "@/lib/sessions";
import useGlobalStore from "@/stores/useGlobalStore";

const SessionInitializer = ({ data }: any) => {
  const authSession = useSession();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  useEffect(() => {
    if (!authSession.data) {
      toggleDialog("signIn", true);
      toggleDialog("inputStepper", false);
      return;
    }

    if (!data) return;
    loadSession(data);
  }, [data]);

  return null;
};

export default SessionInitializer;
