import L from "leaflet";
import React, { useEffect, useRef } from "react";

import { trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";

const ITEMS = [
  {
    text: "About",
    content: "about",
  },
  {
    text: "Trusted AI Principles",
    content: "tai",
  },
  {
    text: "Legal & Privacy",
    content: "legal",
  },
];
const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  useEffect(() => {
    if (footerRef.current) {
      L.DomEvent.disableClickPropagation(footerRef.current);
    }
  }, []);

  const handleClick = (content: string) => {
    trackAction("click", "footer", content);
    setDialogData("info", content);
    toggleDialog("info");
  };

  return (
    <div
      className="z-[10001yarn upgrade --latest] flex items-center gap-2 p-2 font-sans bg-white rounded-md shadow-md cursor-auto"
      ref={footerRef}
    >
      <div>
        created by{" "}
        <a href="https://innovation.dw.com" target="_blank">
          DW Innovation
        </a>
        , &copy; map data{" "}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      </div>
      |
      {ITEMS.map((item) => (
        <div key={item.text} className="text-sm text-muted-foreground">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.content);
            }}
          >
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Footer;
