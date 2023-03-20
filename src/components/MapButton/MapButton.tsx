import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

const MapButton = ({ children, onClick, isActive = false }: Props) => {
  return (
    <button
      onClick={() => onClick()}
      className={clsx(
        "block p-1 border-2 rounded-md  hover:bg-slate-100 border-slate-400",
        isActive ? "bg-slate-100" : "bg-slate-200"
      )}
    >
      {children}
    </button>
  );
};

export default MapButton;
