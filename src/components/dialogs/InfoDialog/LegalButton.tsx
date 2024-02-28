import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";

const LegalButton = () => {
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleClick = () => {
    setDialogData("info", "legal");
  };
  return (
    <a
      onClick={handleClick}
      className="inline underline text-accent-foreground hover:no-underline focus:outline-none hover:cursor-pointer"
    >
      privacy policy
    </a>
  );
};

export default LegalButton;
