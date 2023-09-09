"use client";

import React from "react";

import {
  Select as RadixSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  options: { value: string; label: string; disabled?: boolean }[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
};

const Select = ({
  options,
  value,
  onSelect,
  className,
  placeholder,
}: Props) => (
  <RadixSelect value={value} onValueChange={onSelect}>
    <SelectTrigger
      className={cn("text-left truncate ...", className)}
      placeholder={placeholder}
      disabled={options.length === 0}
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="absolute z-[20000]">
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
