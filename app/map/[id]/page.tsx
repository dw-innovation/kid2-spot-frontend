import axios from "axios";
import { Metadata } from "next";
import React from "react";

import SessionInitializer from "@/components/SessionInitializer";

import MapPage from "../page";

async function getSession(id: string) {
  const auth = process.env.HTTP_BASIC_AUTH?.split(":") || [];
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSession`,
    {
      params: {
        id: id,
      },
      auth: {
        username: auth[0] || "",
        password: auth[1] || "",
      },
    }
  );
  return { props: { data: res.data.data } };
}

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
