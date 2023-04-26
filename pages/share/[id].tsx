import axios from "axios";
import { GetServerSidePropsContext } from "next";
import IndexPage from "pages";
import React, { useEffect } from "react";

import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

const SessionPage = ({ data }: any) => {
  const initializeMapStore = useMapStore((state) => state.initialize);
  const initializeQueryStore = useQueryStore((state) => state.initialize);

  useEffect(() => {
    initializeMapStore(data.useMapStore);
    initializeQueryStore(data.useQueryStore);
  });

  return <IndexPage />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSession`,
    {
      params: {
        id: id,
      },
    }
  );
  return { props: { data: res.data } };
}

export default SessionPage;