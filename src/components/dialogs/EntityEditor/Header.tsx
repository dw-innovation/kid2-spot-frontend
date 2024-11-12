import React from "react";

import useSpotQueryStore from "@/stores/useSpotQueryStore";

type Props = {
  nodeId: number;
  name: string;
};

const Header = ({ nodeId, name }: Props) => {
  const updateNodeDisplayName = useSpotQueryStore(
    (state) => state.updateNodeDisplayName
  );

  const handleUpdateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeDisplayName(nodeId, event.target.value);
  };

  return (
    <div className="flex items-center text-xl font-bold">
      <h2 className="mr-2">Edit OSM tags and rules for</h2>
      <input
        type="text"
        value={name}
        onChange={handleUpdateName}
        className="inline-block w-fit bg-slate-200 rounded-sm px-2 capitalize"
      />
    </div>
  );
};

export default Header;
