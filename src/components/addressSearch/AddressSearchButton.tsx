import React from "react";

import Lens from "@/assets/icons/lens";
import { callGeocodeAPI } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";

const AddressSearchButton = () => {
    const toggleShowSuggestions = useAppStore(
        (state) => state.toggleShowSuggestions
    );
    return (
        <button
            onClick={() => {
                callGeocodeAPI();
                toggleShowSuggestions(true);
            }}
            className="h-full p-3 bg-blue-400 hover:bg-blue-500"
            type="submit"
        >
            <Lens />
        </button>
    );
};

export default AddressSearchButton;
