"use client";

import { PlusIcon } from "lucide-react";
import React, { useRef } from "react";

import { Button } from "@/components/ui/button";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";

import { useMapAlert } from "../Context";

type Props = {
  handleAction: () => void;
  buttonText: string;
  alertText: string;
};

const MapAlert = ({ handleAction, buttonText, alertText }: Props) => {
  const { showAlert, setShowAlert } = useMapAlert();
  const alertRef = useRef<HTMLDivElement>(null);
  const handleCloseClick = () => {
    setShowAlert(false);
  };

  useDisableMapInteraction(alertRef);

  return (
    <>
      {showAlert && (
        <div
          ref={alertRef}
          className="relative flex items-center justify-center max-w-[16rem] gap-2 px-2 py-1 mr-2 text-black bg-orange-200 rounded-lg shadow-lg cursor-default md:max-w-sm lg:max-w-xl w-fit"
        >
          <span className="leading-tight">{alertText}</span>
          <Button onClick={handleAction} variant={"secondary"} size={"fit"}>
            {buttonText}
          </Button>
          <button
            className="absolute top-0 right-0 rotate-45 bg-white rounded-full translate-x-1/3 -translate-y-1/3 hover:bg-slate-200"
            onClick={handleCloseClick}
          >
            <PlusIcon size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default MapAlert;
