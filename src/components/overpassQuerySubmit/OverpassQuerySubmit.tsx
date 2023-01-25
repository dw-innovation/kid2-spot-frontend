import React from "react";
import { callOverpassAPI } from "@/lib/utils";
import useSessionStore from "src/stores/useSessionStore";
import { RotatingLines } from "react-loader-spinner";

const OverpassQuerySubmit = () => {
  const apiState = useSessionStore((state) => state.apiState);
  return (
    <button
      onClick={() => callOverpassAPI()}
      className="block bg-slate-100 px-2 py-1 hover:bg-slate-300"
      disabled={apiState === "loading"}
    >
      {apiState === "loading" ? (
        <div className="flex gap-2 items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
        running query
        </div>
      ) : (
        "run query"
      )}
    </button>
  );
};

export default OverpassQuerySubmit;
