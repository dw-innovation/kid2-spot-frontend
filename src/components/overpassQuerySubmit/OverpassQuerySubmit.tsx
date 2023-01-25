import React from "react";
import { callOverpassAPI } from "@/lib/utils";
import useSessionStore from "src/stores/useSessionStore";
import { RotatingLines } from "react-loader-spinner";
import Triangle from "src/assets/icons/triangle";
import clsx from "clsx";

const OverpassQuerySubmit = () => {
  const apiState = useSessionStore((state) => state.apiState);
  return (
    <button
      onClick={() => callOverpassAPI()}
      className={clsx(
        "block  px-2 py-1",
        apiState === "idle" && "bg-slate-100 hover:bg-slate-300",
        apiState === "loading" && "bg-slate-100",
        apiState === "error" && "bg-red-100",
      )}
      disabled={apiState === "loading"}
    >
      <div className="flex gap-2 items-center">
        {apiState === "loading" ? (
          <>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
            running query
          </>
        ) : (
          <>
            <span className="text-green-600">
              <Triangle width={20} />
            </span>{" "}
            run query
          </>
        )}
      </div>
    </button>
  );
};

export default OverpassQuerySubmit;
