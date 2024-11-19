"use client";

import { useEffect } from "react";

import { loadSession } from "@/lib/sessions";

const SessionInitializer = ({ data }: any) => {
  useEffect(() => {
    if (!data) return;
    loadSession(data);
  }, [data]);

  return null;
};

export default SessionInitializer;
