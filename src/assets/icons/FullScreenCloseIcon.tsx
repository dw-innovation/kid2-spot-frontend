import React from "react";

type Props = {
  size?: number;
};

const FullScreenCloseIcon = ({ size = 20 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21.707 3.707L16.414 9H20a1 1 0 110 2h-6.003a.997.997 0 01-.702-.29l-.004-.005a.997.997 0 01-.291-.702V4a1 1 0 112 0v3.586l5.293-5.293a1 1 0 111.414 1.414zM9 20a1 1 0 102 0v-6-.003a.997.997 0 00-.997-.997H4a1 1 0 100 2h3.586l-5.293 5.293a1 1 0 101.414 1.414L9 16.414V20z"
    ></path>
  </svg>
);

export default FullScreenCloseIcon;
