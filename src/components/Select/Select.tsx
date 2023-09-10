import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

type Props = {
  options: { value: string; label: string }[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  enableReset?: boolean;
};

const Select = ({
  options,
  value,
  onSelect,
  className,
  placeholder,
  enableReset = false,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>(options.find((option) => option.value === value) || null);

  useEffect(() => {
    enableReset && setSelectedValue(null);
  }, [enableReset, options]);

  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      value={selectedValue}
      onChange={(option: { value: string; label: string } | null) => {
        const newValue = option?.value || "";
        setSelectedValue(option);
        onSelect(newValue);
      }}
      className={`w-full text-sm ${className}`}
      isDisabled={options.length === 0}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default Select;
