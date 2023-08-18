"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useQueryStore from "@/stores/useQueryStore";

import Select from "../Select";

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

  const { setValue } = useForm();

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
      <span>Search area:</span>
      <Select
        onSelect={(v) => {
          setSearchArea(v as "bbox" | "polygon");
        }}
        options={[
          { label: "Bounding Box", value: "bbox" },
          {
            label: "Polygon",
            value: "polygon",
            disabled: polygonOptionDisabled,
          },
        ]}
        value={searchArea}
      />
      {searchArea === "polygon" && (
        <span>
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
