import React from "react";
import { callOverpassAPI } from "@/lib/utils";

const OverpassQuerySubmit = () => {
  return <button onClick={() => callOverpassAPI()} className="block bg-slate-100 px-2 py-1 hover:bg-slate-300">run query</button>;
};

export default OverpassQuerySubmit;
