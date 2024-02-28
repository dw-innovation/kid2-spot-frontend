import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";

const TAIButton = () => {
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleClick = () => {
    setDialogData("info", "tai");
  };
  return (
    <a
      onClick={handleClick}
      className="inline-block underline text-accent-foreground hover:no-underline focus:outline-none hover:cursor-pointer"
    >
      &ldquo;Trusted AI Principles&rdquo; section
    </a>
  );
};

export default TAIButton;
