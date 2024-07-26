import React from "react";

import { Button } from "@/components/ui/button";
import useMapStore from "@/stores/useMapStore";

type Props = {
  coordinates: [number, number];
};

const SERVICES: ["Google", "Bing", "Yandex"] = ["Google", "Bing", "Yandex"];

const MapServiceButtons = ({ coordinates }: Props) => {
  const mapZoom = useMapStore((state) => state.mapZoom);

  const handleOpen = (
    service: "Google" | "Bing" | "Yandex",
    mapZoom: number
  ) => {
    const [lat, lng] = coordinates;
    let url = "";

    switch (service) {
      case "Google":
        url = `https://www.google.com/maps?q=${lat},${lng}&z=${mapZoom}`;
        break;
      case "Bing":
        url = `https://www.bing.com/maps?cp=${lat}~${lng}&lvl=${mapZoom}&sp=point.${lat}_${lng}_Marker`;
        break;
      case "Yandex":
        url = `https://yandex.com/maps/?ll=${lng},${lat}&z=${mapZoom}&pt=${lng},${lat},comma`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex gap-2 w-full">
      {SERVICES.map((service) => (
        <Button
          onClick={() => handleOpen(service, mapZoom)}
          key={service}
          variant={"secondary"}
          className="flex-1"
        >
          {service}
        </Button>
      ))}
    </div>
  );
};

export default MapServiceButtons;
