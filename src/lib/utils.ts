import axios from "axios";
import { LatLng } from "leaflet";

import useAddressStore from "@/stores/useAddressStore";
import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

interface Bounds {
    _southWest: {
        lat: number;
        lng: number;
    };
    _northEast: {
        lat: number;
        lng: number;
    };
}

export const transformBbox = (bbox: Bounds): number[] => {
    return [
        bbox._southWest.lat,
        bbox._southWest.lng,
        bbox._northEast.lat,
        bbox._northEast.lng,
    ];
};

export const callOverpassAPI = async (): Promise<any> => {
    let setApiState = useAppStore.getState().setApiState;
    setApiState("loading");

    let setMarkers = useMapStore.getState().setMarkers;
    let bbox = useMapStore.getState().bbox;
    let overpassQuery = useQueryStore.getState().overpassQuery;

    var config = {
        method: "get",
        url: process.env.NEXT_PUBLIC_OVERPASS_API_URL,
        params: {
            data: overpassQuery.replaceAll("{{bbox}}", bbox.join(",")),
        },
    };

    axios(config)
        .then((response) => {
            setMarkers(response.data.elements);
            setApiState("idle");
        })
        .catch((error) => {
            console.log(error);
            setApiState("error");
        });
};

export const callGeocodeAPI = async (): Promise<any> => {
    const address = useAddressStore.getState().searchAddress;
    const setAddressSuggestions =
        useAddressStore.getState().setAddressSuggestions;

    await axios
        .get("/api/geocode", {
            params: {
                address: address,
            },
        })
        .then((response) => {
            setAddressSuggestions(response.data);
        });
};

export const exportMarkers = () => {
    let markers = useMapStore.getState().markers;
    const fileData = JSON.stringify(markers);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "export.json";
    link.href = url;
    link.click();
};

export const getFlyToAnimationSpeed = (
    currentMapCenter: LatLng,
    nextMapCenter: LatLng
): number => {
    const distance = currentMapCenter.distanceTo(nextMapCenter) / 5000;
    return Math.log(distance) + 1;
};

export const exportQuery = () => {
    let overpassQuery = useQueryStore.getState().overpassQuery;
    const blob = new Blob([overpassQuery], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "overpassQuery.txt";
    link.href = url;
    link.click();
};
