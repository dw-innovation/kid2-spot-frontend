import React from "react";

import Select from "@/components/Select";

interface Option {
  value: string;
  label: string;
}

interface SessionSelectProps {
  options: Option[];
  value: string | undefined;
  onSelect: (value: string) => void;
}

const SessionSelect: React.FC<SessionSelectProps> = ({
  options,
  value,
  onSelect,
}) => (
  <Select
    options={options}
    value={value || ""}
    onSelect={onSelect}
    className="max-w-full"
    placeholder="Select a Session"
  />
);

export default SessionSelect;
