import { type Map } from "leaflet";
import React, { useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";

type Props = {
  onClick: () => Map;
  children: React.ReactNode;
  className?: string;
};

const ControlButton = ({ onClick, children, className }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useDisableMapInteraction(buttonRef);

  return (
    <div>
      <Button
        onClick={onClick}
        size={"fit"}
        ref={buttonRef}
        className={cn(
          "flex items-center justify-center w-5 leading-none shadow-lg aspect-square",
          className
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default ControlButton;
