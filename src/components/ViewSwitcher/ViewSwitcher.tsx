import clsx from "clsx";
import React from "react";

import useAppStore from "@/stores/useAppStore";

import { Button } from "../ui/button";

const ViewSwitcher = () => {
  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);

  const VIEWS: { name: "map" | "data"; label: string }[] = [
    {
      name: "map",
      label: "Map",
    },
    {
      name: "data",
      label: "Data",
    },
  ];

  return (
    <div className="flex">
      {VIEWS.map((item, index) => (
        <Button
          key={index}
          onClick={() => setView(item.name)}
          disabled={view === item.name}
          className={clsx("p-2 hover:bg-slate-200 leading-none")}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
