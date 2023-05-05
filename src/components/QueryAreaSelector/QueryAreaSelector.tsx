import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useQueryStore from "@/stores/useQueryStore";

const QueryAreaSelector = () => {
  const [polygonOptionDisabled, setPolygonOptionDisabled] = useState(false);
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const setSearchArea = useQueryStore((state) => state.setSearchArea);
  const searchArea = useQueryStore((state) => state.searchArea);
  const searchAreaBuffer = useQueryStore((state) => state.searchAreaBuffer);
  const setSearchAreaBuffer = useQueryStore(
    (state) => state.setSearchAreaBuffer
  );

  const { register, setValue } = useForm();

  useEffect(() => {
    if (customSearchArea.length <= 2) {
      searchArea === "polygon" && setValue("searchAreaInput", "bbox");
      setSearchArea("bbox");
      setPolygonOptionDisabled(true);
    } else {
      setPolygonOptionDisabled(false);
    }
  }, [customSearchArea, searchArea, setSearchArea, setValue]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-white">Search area:</span>
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
            value={searchAreaBuffer}
            type="number"
            className="w-20 p-1 text-black"
            onChange={({ target: { value } }) =>
              setSearchAreaBuffer(parseFloat(value))
            }
          />{" "}
          m
        </span>
      )}
    </div>
  );
};

export default QueryAreaSelector;
