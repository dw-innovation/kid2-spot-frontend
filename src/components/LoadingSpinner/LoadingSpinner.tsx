import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => (
  <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="20"
    visible={true}
  />
);

export default LoadingSpinner;
