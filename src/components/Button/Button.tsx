import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

const Button = ({ children, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, "bg-white p-2 hover:bg-slate-200")}
    >
      {children}
    </button>
  );
};

export default Button;
