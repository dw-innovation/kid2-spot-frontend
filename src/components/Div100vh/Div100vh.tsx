"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Div100vh = ({ children }: Props) => {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        height: `${viewportHeight}px`,
        maxHeight: `${viewportHeight}px`,
      }}
      className="p-2 overflow-hidden"
    >
      {children}
    </div>
  );
};

export default Div100vh;
