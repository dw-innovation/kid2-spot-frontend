import React from "react";

import { trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";

const LegalButton = () => {
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleClick = () => {
    trackAction("click", "modal", "legal");
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
