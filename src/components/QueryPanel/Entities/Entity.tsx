import { Edit2Icon } from "lucide-react";
import React from "react";

type Props = {
  name: string;
  id: number;
};

const Entity = ({ name, id }: Props) => {
  const handleEditClick = (id: number) => {
    console.log("edit", id);
  };

  return (
    <div className="flex gap-1 p-1 capitalize bg-red-200 rounded-md w-fit">
      <span>{name}</span>
      <span className="border-r-[1px] border-black my-[2px]"></span>
      <button onClick={() => handleEditClick(id)}>
        <Edit2Icon size={10} />
      </button>
    </div>
  );
};

export default Entity;
