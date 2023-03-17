import React from "react";

import PolygonIcon from "@/assets/icons/polygon";
import useMapStore from "@/stores/useMapStore";

import Button from "../Button";

type Props = {};

const PolygonModeButton = ({}: Props) => {
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);
  const polygonMode = useMapStore((state) => state.polygonMode);

  return (
    <Button onClick={() => togglePolygonMode()} className={polygonMode ? "bg-green-200": ""}>
      <PolygonIcon size={20} />
    </Button>
  );
};

export default PolygonModeButton;
