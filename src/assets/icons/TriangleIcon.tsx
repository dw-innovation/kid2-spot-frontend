import React from "react";

type Props = {
  size?: number;
};

const TriangleIcon = ({ size = 20 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M15.795 11.272l-8 5A1.5 1.5 0 015.5 15V5a1.5 1.5 0 012.295-1.272l8 5a1.5 1.5 0 010 2.544z"
    ></path>
  </svg>
);

export default TriangleIcon;
