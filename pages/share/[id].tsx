import axios from "axios";
import { GetServerSidePropsContext } from "next";
import IndexPage from "pages";
import React from "react";

const SessionPage = () => {
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
  console.log(res.data);

  return { props: { data: res.data } };
}

export default SessionPage;
