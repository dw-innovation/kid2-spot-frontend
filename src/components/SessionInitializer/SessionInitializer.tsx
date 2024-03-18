"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { loadSession } from "@/lib/sessions";
import { JWTSession } from "@/types/next-auth";

const SessionInitializer = ({ data }: any) => {
  const { data: sessionData } = useSession();
  const session = sessionData as JWTSession;
  useEffect(() => {
    if (!data) return;
    loadSession(data, session?.user?.jwt || "");
  }, [data]);

  return null;
};

export default SessionInitializer;
