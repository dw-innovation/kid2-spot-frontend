import L from "leaflet";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchOSMData } from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { setResults } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

const SearchCurrentViewButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [apiStatus, fetchData] = useApiStatus(fetchOSMData);
  const setSearchArea = useImrStore((state) => state.setSearchArea);
  const searchArea = useImrStore((state) => state.imr.area.type);
  const bounds = useMapStore((state) => state.bounds);

  useEffect(() => {
    if (buttonRef.current) {
      L.DomEvent.disableClickPropagation(buttonRef.current);
      L.DomEvent.disableScrollPropagation(buttonRef.current);
    }
  }, []);

  const handleSearchCurrentViewClick = async () => {
    searchArea === "area" &&
      setSearchArea("bbox", [
        bounds[0][1],
        bounds[0][0],
        bounds[1][1],
        bounds[1][0],
      ]);
    await fetchData().then((data) => {
      setResults(data);
    });
  };

  return (
    <Button
      className="rounded-lg"
      ref={buttonRef}
      onClick={handleSearchCurrentViewClick}
    >
      {apiStatus === "loading" ? (
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
