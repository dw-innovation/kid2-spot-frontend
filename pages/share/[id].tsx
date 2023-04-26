import axios from "axios";
import IndexPage from "pages";
import React from "react";

const SessionPage = () => {
  return <IndexPage />;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get("http://localhost:3000/api/getSession", {
    params: {
      id: id,
    },
  });
  console.log(res.data);

  return { props: { data: res.data } };
}

export default SessionPage;
