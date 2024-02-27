import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";

const TAIButton = () => {
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleClick = () => {
    setDialogData("info", "tai");
  };
  return (
    <a onClick={handleClick}>&ldquo;Trusted AI Principles&rdquo; section</a>
  );
};

export default TAIButton;
