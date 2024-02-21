import L from "leaflet";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchOSMData } from "@/lib/apiServices";
import { setResults } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

const SearchCurrentViewButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const setSearchArea = useImrStore((state) => state.setSearchArea);
  const searchArea = useImrStore((state) => state.imr.area.type);
  const bounds = useMapStore((state) => state.bounds);
  const imr = useImrStore((state) => state.imr);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const setError = useGlobalStore((state) => state.setError);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(fetchOSMData, {
    onSuccess: (data) => {
      if (data.results.features.length === 0) {
        toggleDialog("error");
        setError("noResults");
      } else {
        queryClient.setQueryData("osmData", data);
        setResults(data);
      }
    },
  });

  useEffect(() => {
    if (buttonRef.current) {
      L.DomEvent.disableClickPropagation(buttonRef.current);
      L.DomEvent.disableScrollPropagation(buttonRef.current);
    }
  }, []);

  const handleSearchCurrentViewClick = () => {
    if (searchArea === "area") {
      setSearchArea("bbox", [
        bounds[0][1],
        bounds[0][0],
        bounds[1][1],
        bounds[1][0],
      ]);
    }
    mutate({ imr });
  };

  return (
    <Button
      className="rounded-lg shadow-lg"
      ref={buttonRef}
      onClick={handleSearchCurrentViewClick}
    >
      {isLoading ? (
        <div className="w-4 h-4">
          <LoadingSpinner />
        </div>
      ) : (
        <SearchIcon className="w-4 h-4" />
      )}
      Search Current Area
    </Button>
  );
};

export default SearchCurrentViewButton;
