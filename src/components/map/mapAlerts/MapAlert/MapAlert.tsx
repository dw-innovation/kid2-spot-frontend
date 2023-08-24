import L from "leaflet";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    if (!alertRef.current) return;
    L.DomEvent.disableClickPropagation(alertRef.current);
    L.DomEvent.disableScrollPropagation(alertRef.current);
  });

  return (
    <>
      {showAlert && (
        <div
          ref={alertRef}
          className="relative flex items-center justify-center gap-2 px-2 py-1 mr-2 text-black bg-orange-200 rounded-lg shadow-lg cursor-default w-fit"
        >
          {alertText}
          <Button
            onClick={handleAction}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
            variant={"secondary"}
          >
            {buttonText}
          </Button>
          <button
            className="absolute top-0 right-0 rotate-45 bg-white rounded-full translate-x-1/3 -translate-y-1/3 hover:bg-slate-200"
            onClick={handleCloseClick}
          >
            <PlusIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default MapAlert;
