import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

type Props = {};

const QueryAreaSelector = (props: Props) => {
  const [polygonOptionDisabled, setPolygonOptionDisabled] = useState(false);
  const polygon = useMapStore((state) => state.polygon);
  const setQueryArea = useQueryStore((state) => state.setQueryArea);
  const queryArea = useQueryStore((state) => state.queryArea);

  const { register, setValue } = useForm();

  useEffect(() => {
    if (polygon.length <= 2) {
      queryArea === "polygon" && setValue("queryAreaInput", "bbox");
      setQueryArea("bbox");
      setPolygonOptionDisabled(true);
    } else {
      setPolygonOptionDisabled(false);
    }
  }, [polygon, queryArea, setQueryArea, setValue]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-white">Area:</span>
      <select
        className="p-1"
        {...register("queryAreaInput", {
          onChange: (e) => setQueryArea(e.target.value),
        })}
      >
        <option value="bbox">Bounding Box</option>
        <option value="polygon" disabled={polygonOptionDisabled}>
          Polygon
        </option>
      </select>
    </div>
  );
};

export default QueryAreaSelector;
