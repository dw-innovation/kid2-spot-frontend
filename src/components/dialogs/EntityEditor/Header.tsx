import React from "react";

import { Input } from "@/components/ui/input";
import useImrStore from "@/stores/useImrStore";

type Props = {
  nodeId: number;
  name: string;
};

const Header = ({ nodeId, name }: Props) => {
  const updateName = useImrStore((state) => state.updateName);

  const handleUpdateName = (newName: string) => {
    updateName(nodeId, newName);
  };

  return (
    <div className="flex items-center text-xl font-bold">
      <h2 className="mr-2">Edit OSM tags and rules for &quot;</h2>
      <Input
        value={name}
        onChange={(e) => handleUpdateName(e.target.value)}
        className="inline-block w-24 capitalize"
      />
      <span>&quot;</span>
    </div>
  );
};

export default Header;
