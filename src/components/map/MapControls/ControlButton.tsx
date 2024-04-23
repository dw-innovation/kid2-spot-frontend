import { type Map } from "leaflet";
import L from "leaflet";
import React, { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => Map;
  children: React.ReactNode;
  className?: string;
};

const ControlButton = ({ onClick, children, className }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      L.DomEvent.disableClickPropagation(buttonRef.current);
    }
  }, []);

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
