import L from "leaflet";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import { IntermediateRepresentation } from "@/types/imr";

const SearchCurrentViewButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const imr = useImrStore((state) => state.imr);
  const setSearchArea = useImrStore((state) => state.setSearchArea);
  const searchArea = useImrStore((state) => state.imr.area.type);
  const bounds = useMapStore((state) => state.bounds);
  const [shouldFetch, setShouldFetch] = useState(false);
  const prevImrRef = useRef<IntermediateRepresentation>(imr);

  useEffect(() => {
    if (prevImrRef.current === imr) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      prevImrRef.current = imr;
    }
  }, [imr]);

  const { isLoading } = useQueryOSMData({
    isEnabled: shouldFetch,
    onSettled() {
      setShouldFetch(false);
      setIsDisabled(true);
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
    setShouldFetch(true);
  };

  return (
    <Button
      className="rounded-lg shadow-lg"
      ref={buttonRef}
      onClick={handleSearchCurrentViewClick}
      disabled={searchArea !== "bbox" ? false : isLoading || isDisabled}
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
