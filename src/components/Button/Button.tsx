import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ children, onClick, className, disabled = false }: Props) => (
  <button
    onClick={onClick}
    className={clsx(className, "bg-white p-2 hover:bg-slate-200 leading-none")}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
