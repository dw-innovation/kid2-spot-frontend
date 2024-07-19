import React from "react";

import { Button } from "@/components/ui/button";
import useMapStore from "@/stores/useMapStore";

type Props = {
  coordinates: [number, number];
};

const SERVICES: ["google", "bing", "yandex"] = ["google", "bing", "yandex"];

const MapServiceButtons = ({ coordinates }: Props) => {
  const mapZoom = useMapStore((state) => state.mapZoom);

  const handleOpen = (
    service: "google" | "bing" | "yandex",
    mapZoom: number
  ) => {
    const [lat, lng] = coordinates;
    let url = "";

    switch (service) {
      case "google":
        url = `https://www.google.com/maps?q=${lat},${lng}&z=${mapZoom}`;
        break;
      case "bing":
        url = `https://www.bing.com/maps?cp=${lat}~${lng}&lvl=${mapZoom}`;
        break;
      case "yandex":
        url = `https://yandex.com/maps/?ll=${lng},${lat}&z=${mapZoom}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex gap-2">
      {SERVICES.map((service) => (
        <Button
          onClick={() => handleOpen(service, mapZoom)}
          key={service}
          variant={"secondary"}
        >
          {service}
        </Button>
      ))}
    </div>
  );
};

export default MapServiceButtons;
