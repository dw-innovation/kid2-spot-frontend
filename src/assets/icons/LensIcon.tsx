import React from "react";

type Props = {
  size?: number;
};

const LensIcon = ({ size = 16 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.46 10.319l4.304 4.304a.807.807 0 11-1.142 1.14L10.32 11.46a6.4 6.4 0 111.14-1.141h.001zm-5.06.88a4.8 4.8 0 100-9.6 4.8 4.8 0 000 9.6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default LensIcon;
