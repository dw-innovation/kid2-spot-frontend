import clsx from "clsx";
import {
  Callback,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  StateChangeOptions,
} from "downshift";
import React from "react";

interface AddressSuggestionProps {
  isOpen: boolean;
  suggestions: any[];
  highlightedIndex: number | null;
  selectedItem: any;
  getItemProps: (options: any) => any;
  selectItem: (
    item: any,
    otherStateToSet?: Partial<StateChangeOptions<any>> | undefined,
    cb?: Callback | undefined
  ) => void;
  getMenuProps: (
    options?: GetMenuPropsOptions | undefined,
    otherOptions?: GetPropsCommonOptions | undefined
  ) => any;
}

const AddressSuggestions = ({
  isOpen,
  suggestions,
  highlightedIndex,
  selectedItem,
  getItemProps,
  getMenuProps,
}: AddressSuggestionProps) => (
  <ul
    className={`absolute w-full bg-white mt-1 shadow-md max-h-80 p-0 z-[800] overflow-y-auto ${
      !isOpen && suggestions.length === 0 && "hidden"
    }`}
    {...getMenuProps()}
  >
    {isOpen &&
      suggestions.map((item, index) => (
        <li
          key={index}
          className={clsx(
            highlightedIndex === index && "bg-blue-300",
            selectedItem === item && "font-bold",
            "py-2 px-3 shadow-sm flex flex-col cursor-pointer"
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
