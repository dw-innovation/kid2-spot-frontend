import L from "leaflet";
import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (footerRef.current) {
      L.DomEvent.disableClickPropagation(footerRef.current);
    }
  }, []);

  const handleClick = (content: string) => {
    console.log(content);
    toggleDialog("info");
  };

  return (
    <div
      className="flex items-center gap-2 p-2 font-sans bg-white rounded-md shadow-md cursor-auto"
      ref={footerRef}
    >
      created by DW Innovation
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
