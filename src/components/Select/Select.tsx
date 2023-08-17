import React from "react";

import {
  Select as RadixSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: { value: string; label: string; disabled?: boolean }[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
};

const Select = ({ options, value, onSelect }: Props) => (
  <RadixSelect value={value} onValueChange={onSelect}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent className="absolute z-[10000]">
      <SelectGroup>
        {options.map(({ value, label, disabled }) => (
          <SelectItem key={value} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </RadixSelect>
);

export default Select;
