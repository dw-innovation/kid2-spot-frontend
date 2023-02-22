import React from "react";

const Triangle = ({ width = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M15.795 11.272l-8 5A1.5 1.5 0 015.5 15V5a1.5 1.5 0 012.295-1.272l8 5a1.5 1.5 0 010 2.544z"
      ></path>
    </svg>
  );
};

export default Triangle;
