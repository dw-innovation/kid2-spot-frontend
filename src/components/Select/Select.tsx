import React, { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  value: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
};

const Select = ({ options, value, label, onSelect }: Props) => (
  <div>
    {label !== "" && <label>{label}</label>}
    <select onChange={onSelect} className="p-2" value={value}>
      {options.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
