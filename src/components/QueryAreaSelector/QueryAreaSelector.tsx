import { bbox } from "@turf/turf";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";

const QueryAreaSelector = () => {
  const [polygonOptionDisabled, setPolygonOptionDisabled] = useState(false);
  const polygonOutsideBBox = usePolygonStore(
    (state) => state.polygonOutsideBBox
  );
  const polygon = usePolygonStore((state) => state.polygon);
  const setQueryArea = useQueryStore((state) => state.setQueryArea);
  const queryArea = useQueryStore((state) => state.queryArea);
  const areaBuffer = useQueryStore((state) => state.areaBuffer);
  const setAreaBuffer = useQueryStore((state) => state.setAreaBuffer);
  const setBounds = useMapStore((state) => state.setBounds);

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

  const handleFlyToBounds = () => {
    let newBBox = bbox({
      type: "Polygon",
      coordinates: [polygon],
    });
    setBounds([
      [newBBox[0], newBBox[1]],
      [newBBox[2], newBBox[3]],
    ]);
  };

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
      {queryArea === "polygon" && (
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
      {polygonOutsideBBox && (
        <span className="px-2 py-1 text-black bg-orange-400 rounded-lg">
          polygon outside current bounding box!{" "}
          <button
            onClick={handleFlyToBounds}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
          >
            fly to polygon
          </button>
        </span>
      )}
    </div>
  );
};

export default QueryAreaSelector;
