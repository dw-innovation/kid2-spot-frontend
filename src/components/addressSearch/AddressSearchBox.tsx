import Downshift from "downshift";
import { debounce, DebouncedFunc } from "lodash";
import React, { useCallback, useEffect, useRef } from "react";

import { callGeocodeAPI } from "@/lib/utils";
import useAddressStore from "@/stores/useAddressStore";
import useMapStore from "@/stores/useMapStore";

import AddressSuggestions from "./AddressSuggestions";

const AddressSearchBox = () => {
  const addressSuggestions = useAddressStore(
    (state) => state.addressSuggestions
  );
  const setSearchAddress = useAddressStore((state) => state.setSearchAddress);
  const setAddressSuggestions = useAddressStore(
    (state) => state.setAddressSuggestions
  );
  const searchAddress = useAddressStore((state) => state.searchAddress);
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  const setBounds = useMapStore((state) => state.setBounds);

  const lastSearchAddressRef = useRef("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallGeocodeAPI = useCallback(
    debounce(async () => {
      const suggestions = await callGeocodeAPI(searchAddress);
      if (suggestions) {
        setAddressSuggestions(suggestions);
      }
      lastSearchAddressRef.current = searchAddress;
    }, 200) as DebouncedFunc<() => void>,
    [searchAddress, setAddressSuggestions]
  );

  useEffect(() => {
    if (searchAddress && searchAddress !== lastSearchAddressRef.current) {
      debouncedCallGeocodeAPI();
    }
    return () => {
      debouncedCallGeocodeAPI.cancel();
    };
  }, [searchAddress, debouncedCallGeocodeAPI, lastSearchAddressRef]);

  return (
    <div className="flex flex-col gap-1 justify-end w-[20rem]">
      <Downshift
        onChange={({ coordinates, bbox, place_name_en }) => {
          setBounds([
            [bbox[1], bbox[0]],
            [bbox[3], bbox[2]],
          ]);

          setCurrentAddress({ placeName: place_name_en, coordinates });
        }}
        itemToString={(item) => (item ? item.place_name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div>
            <div className="flex flex-col gap-1">
              <div
                className="flex shadow-lg bg-white rounded-lg gap-0.5"
                {...getRootProps({}, { suppressRefError: true })}
              >
                <div className="flex items-center justify-center flex-1 gap-2 rounded-lg">
                  <input
                    placeholder="Search for a place"
                    className="w-full p-2 rounded-lg"
                    {...getInputProps({
                      onChange: (e) => setSearchAddress(e.target.value),
                    })}
                  />
                </div>
                <button
                  aria-label={"toggle menu"}
                  className="px-2"
                  type="button"
                  {...getToggleButtonProps()}
                >
                  {isOpen ? <>&#8593;</> : <>&#8595;</>}
                </button>
              </div>
            </div>

            <AddressSuggestions
              isOpen={isOpen}
              suggestions={addressSuggestions}
              highlightedIndex={highlightedIndex}
              selectedItem={selectedItem}
              getItemProps={getItemProps}
            />
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default AddressSearchBox;
