import React, { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  defaultValue: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
};

const Select = ({ options, defaultValue, label, onSelect }: Props) => (
  <div>
    <label>{label}</label>
    <select defaultValue={defaultValue} onChange={onSelect} className="p-2">
      {options.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
