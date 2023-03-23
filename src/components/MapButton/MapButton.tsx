import clsx from "clsx";
import { DomEvent } from "leaflet";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
};

const MapButton = ({
  children,
  onClick,
  isActive = false,
  className,
}: Props) => (
  <button
    onClick={(e) => {
      DomEvent.disableClickPropagation(e.target); // avoid map click event
      DomEvent.disableScrollPropagation(e.target); // avoid map scroll event
      onClick();
    }}
    className={clsx(
      "block p-1 rounded-lg shadow-lg hover:bg-slate-200 transition-all duration-200",
      isActive ? "bg-slate-300" : "bg-white",
      className
    )}
  >
    {children}
  </button>
);

export default MapButton;
