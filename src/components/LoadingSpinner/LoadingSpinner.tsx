import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = "1rem" }: { size?: string }) => (
  <Loader2
    className="w-4 h-4 animate-spin"
    style={{
      width: size,
      height: size,
    }}
  />
);

export default LoadingSpinner;
