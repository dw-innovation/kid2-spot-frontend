import { GetMenuPropsOptions, GetPropsCommonOptions } from "downshift";
import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  suggestions: any[];
  highlightedIndex: number | null;
  selectedItem: any;
  getItemProps: (options: any) => any;
  getMenuProps: (
    options?: GetMenuPropsOptions | undefined,
    otherOptions?: GetPropsCommonOptions | undefined
  ) => any;
};

const AddressSuggestions = ({
  isOpen,
  suggestions,
  highlightedIndex,
  selectedItem,
  getItemProps,
  getMenuProps,
}: Props) => (
  <ul
    className={cn(
      "absolute w-full bg-white mt-1 shadow-md max-h-80 p-0 z-[800] overflow-y-auto",
      !isOpen && suggestions.length === 0 && "hidden"
    )}
    {...getMenuProps()}
  >
    {isOpen &&
      suggestions.map((item, index) => (
        <li
          key={index}
          className={cn(
            "py-2 px-3 shadow-sm flex flex-col cursor-pointer",
            highlightedIndex === index && "bg-blue-300",
            selectedItem === item && "font-bold"
          )}
          {...getItemProps({
            index,
            item,
          })}
        >
          {item.place_name}
        </li>
      ))}
  </ul>
);

export default AddressSuggestions;
