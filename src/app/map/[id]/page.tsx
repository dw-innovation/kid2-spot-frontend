import React from "react";

import SessionInitializer from "@/components/SessionInitializer";
import { getSession } from "@/lib/apiServices";

import MapPage from "../page";

type Props = {
  params: {
    id: string;
  };
};

const SessionPage = async ({ params }: Props) => {
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
