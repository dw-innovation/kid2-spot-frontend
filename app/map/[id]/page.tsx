import { Metadata } from "next";
import React from "react";

import SessionInitializer from "@/components/SessionInitializer";
import { getSession } from "@/lib/apiServices";

import MapPage from "../page";

export const metadata: Metadata = {
  title: "Spot – Search the world with your words",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

const SessionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const {
    props: { data },
  } = await getSession(id || "");

  return (
    <>
      <SessionInitializer data={data} />
      <MapPage />
    </>
  );
};

export default SessionPage;
