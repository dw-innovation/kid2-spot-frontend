import React, { useEffect, useId, useState } from "react";
import ReactSelect from "react-select";

import { cn } from "@/lib/utils";

type Props = {
  options: { value: string; label: string }[];
  value?: string | null;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  enableReset?: boolean;
  isSearchable?: boolean;
  defaultValue?: { value: string; label: string };
  showIndicator?: boolean;
};

const Select = ({
  options,
  value = null,
  onSelect,
  className,
  placeholder,
  enableReset = false,
  isSearchable,
  defaultValue,
  showIndicator = true,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>(
    defaultValue || options.find((option) => option.value === value) || null
  );

  useEffect(() => {
    enableReset && setSelectedValue(null);
  }, [enableReset, options]);

  return (
    <ReactSelect
      instanceId={useId()}
      options={options}
      placeholder={placeholder}
      value={selectedValue}
      onChange={(option: { value: string; label: string } | null) => {
        const newValue = option?.value || "";
        setSelectedValue(option);
        onSelect(newValue);
      }}
      className={cn(`w-full text-sm !font-sans ${className}`)}
      isDisabled={options.length === 0}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "40px",
          flex: 1,
          flexGrow: 1,
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
          display: showIndicator ? "block" : "none",
        }),
        container(base) {
          return {
            ...base,
            padding: 0,
          };
        },
        valueContainer(base) {
          return {
            ...base,
            padding: "0 2px",
          };
        },
        menuList(base) {
          return {
            ...base,
            zIndex: 99999,
            position: "fixed",
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
          };
        },
      }}
      isSearchable={isSearchable}
    />
  );
};

export default Select;
