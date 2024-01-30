import { Edit2Icon } from "lucide-react";
import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";

type Props = {
  name: string;
  id: number;
};

const Entity = ({ name, id }: Props) => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const setDialogData = useGlobalStore((state) => state.setDialogData);

  const handleEditClick = () => {
    toggleDialog("entityEditor");
    setDialogData("entityEditor", { id: id });
  };

  return (
    <div className="flex gap-1 capitalize rounded-md w-fit border-[1px] border-black overflow-clip">
      <span className="p-1">{name}</span>
      <div className="flex h-full">
        <span className="border-r-[1px] border-black " />
        <button
          onClick={() => handleEditClick()}
          className="p-1 hover:bg-primary hover:text-white aspect-square"
        >
          <Edit2Icon size={10} />
        </button>
      </div>
    </div>
  );
};

export default Entity;
