import React from "react";
import { callOverpassAPI } from "@/lib/utils";

const OverpassQuerySubmit = () => {
  return <button onClick={() => callOverpassAPI()}>run query</button>;
};

export default OverpassQuerySubmit;
