import React from "react";

type Props = {
  size?: number;
};

const FullScreenExpandIcon = ({ size = 20 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18 4.654v.291a10 10 0 00-1.763 1.404l-2.944 2.944a1 1 0 001.414 1.414l2.933-2.932A9.995 9.995 0 0019.05 6h.296l-.09.39A9.998 9.998 0 0019 8.64v.857a1 1 0 102 0V4.503a1.5 1.5 0 00-1.5-1.5L14.5 3a1 1 0 100 2h.861a10 10 0 002.249-.256l.39-.09zM4.95 18a10 10 0 011.41-1.775l2.933-2.932a1 1 0 011.414 1.414l-2.944 2.944A9.998 9.998 0 016 19.055v.291l.39-.09A9.998 9.998 0 018.64 19h.86a1 1 0 110 2l-5-.003a1.5 1.5 0 01-1.5-1.5V14.5a1 1 0 112 0v.861a10 10 0 01-.256 2.249l-.09.39h.295z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default FullScreenExpandIcon;
