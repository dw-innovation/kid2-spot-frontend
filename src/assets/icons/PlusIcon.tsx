import React from "react";

type Props = {
  size?: number;
};

const PlusIcon = ({ size = 20 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 7v10m-5-5h10"
      ></path>
    </svg>
  );
};

export default PlusIcon;
