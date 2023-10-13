import L from "leaflet";
import React, { useEffect, useRef } from "react";

const ITEMS = [
  {
    text: "About",
    dialogName: "about",
  },
  {
    text: "Legal & Privacy",
    dialogName: "legal",
  },
];
const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      L.DomEvent.disableClickPropagation(footerRef.current);
    }
  }, []);

  const handleClick = (dialogName: string) => {
    console.log(dialogName);
  };

  return (
    <div
      className="flex items-center gap-2 p-2 font-sans bg-white rounded-md shadow-md cursor-auto"
      ref={footerRef}
    >
      created by DW Innovation
      {ITEMS.map((item) => (
        <div key={item.text} className="text-sm text-muted-foreground">
          <a href="#" onClick={() => handleClick(item.dialogName)}>
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Footer;
