import axios from "axios";
import React from "react";

import SessionInitializer from "@/components/SessionInitializer";

import MapPage from "../page";

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
