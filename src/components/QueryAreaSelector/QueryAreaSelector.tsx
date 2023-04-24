import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";

const QueryAreaSelector = () => {
  const [polygonOptionDisabled, setPolygonOptionDisabled] = useState(false);
  const polygon = usePolygonStore((state) => state.polygon);
  const setSearchArea = useQueryStore((state) => state.setSearchArea);
  const searchArea = useQueryStore((state) => state.searchArea);
  const areaBuffer = useQueryStore((state) => state.areaBuffer);
  const setAreaBuffer = useQueryStore((state) => state.setAreaBuffer);

  const { register, setValue } = useForm();

  useEffect(() => {
    if (polygon.length <= 2) {
      searchArea === "polygon" && setValue("searchAreaInput", "bbox");
      setSearchArea("bbox");
      setPolygonOptionDisabled(true);
    } else {
      setPolygonOptionDisabled(false);
    }
  }, [polygon, searchArea, setSearchArea, setValue]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-white">Area:</span>
      <select
        className="p-1"
        {...register("searchAreaInput", {
          onChange: (e) => setSearchArea(e.target.value),
        })}
      >
        <option value="bbox">Bounding Box</option>
        <option value="polygon" disabled={polygonOptionDisabled}>
          Polygon
        </option>
      </select>
      {searchArea === "polygon" && (
        <span className="text-white">
          add buffer of{" "}
          <input
            value={areaBuffer}
            type="number"
            className="w-20 p-1 text-black"
            onChange={({ target: { value } }) =>
              setAreaBuffer(parseFloat(value))
            }
          />{" "}
          m
        </span>
      )}
    </div>
  );
};

export default QueryAreaSelector;
