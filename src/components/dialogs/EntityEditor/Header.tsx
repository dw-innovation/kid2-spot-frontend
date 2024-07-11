import React from "react";

import { Input } from "@/components/ui/input";
import useSpotQueryStore from "@/stores/useSpotQueryStore";

type Props = {
  nodeId: number;
  name: string;
};

const Header = ({ nodeId, name }: Props) => {
  const updateNodeDisplayName = useSpotQueryStore(
    (state) => state.updateNodeDisplayName
  );

  const handleUpdateName = (newName: string) => {
    updateNodeDisplayName(nodeId, newName);
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
