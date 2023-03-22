import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

const MapButton = ({ children, onClick, isActive = false }: Props) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); // avoid map click event
      onClick();
    }}
    className={clsx(
      "block p-1 rounded-lg shadow-lg hover:bg-slate-200 transition-all duration-200",
      isActive ? "bg-slate-300" : "bg-white"
    )}
  >
    {children}
  </button>
);

export default MapButton;
