"use client";

import IndexPage from "app/page";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

async function getSession(id: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSession`,
    {
      params: {
        id: id,
      },
      auth: {
        username: process.env.APP_USER || "",
        password: process.env.APP_PASSWORD || "",
      },
    }
  );
  return { props: { data: res.data } };
}

const SessionPage = async () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const {
    props: { data },
  } = await getSession(id || "");

  const initializeAppStore = useAppStore((state) => state.initialize);
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);
  const initializeStreetViewStore = useStreetViewStore(
    (state) => state.initialize
  );

  useEffect(() => {
    data.useAppStore && initializeAppStore(data.useAppStore);
    data.useMapStore && initializeMapStore(data.useMapStore);
    data.useQueryStore && initializeQueryStore(data.useQueryStore);
    data.useStreetViewStore &&
      initializeStreetViewStore(data.useStreetViewStore);
  });

  return <IndexPage />;
};

export default SessionPage;
