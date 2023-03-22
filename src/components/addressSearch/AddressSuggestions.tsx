import clsx from "clsx";
import React from "react";

interface AddressSuggestionProps {
  isOpen: boolean;
  suggestions: any[];
  highlightedIndex: number | null;
  selectedItem: any;
  getItemProps: (options: any) => any;
}

const AddressSuggestions = ({
  isOpen,
  suggestions,
  highlightedIndex,
  selectedItem,
  getItemProps,
}: AddressSuggestionProps) => (
  <ul
    className={`absolute w-full bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
      !isOpen && suggestions.length === 0 && "hidden"
    }`}
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
          <span>{item.place_name}</span>
        </li>
      ))}
  </ul>
);

export default AddressSuggestions;
