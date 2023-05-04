import clsx from "clsx";
import { Callback, StateChangeOptions } from "downshift";
import React, { useRef } from "react";

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
}

const AddressSuggestions = ({
  isOpen,
  suggestions,
  highlightedIndex,
  selectedItem,
  getItemProps,
  selectItem,
}: AddressSuggestionProps) => {
  const suggestionsRef = useRef(null);

  const handleClickSelect = (item: any) => {
    selectItem(item);
  };

  return (
    <ul
      className={`absolute w-full bg-white mt-1 shadow-md max-h-80 p-0 ${
        !isOpen && suggestions.length === 0 && "hidden"
      }`}
      ref={suggestionsRef}
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
            onMouseDown={() => handleClickSelect(item)}
          >
            <span>{item.place_name}</span>
          </li>
        ))}
    </ul>
  );
};

export default AddressSuggestions;
