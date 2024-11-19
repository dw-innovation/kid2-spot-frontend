import { SearchIcon } from "lucide-react";
import { useRef } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";
import useMapStore from "@/stores/useMapStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";

const SearchCurrentViewButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useDisableMapInteraction(buttonRef);

  const setSearchAreaBBox = useSpotQueryStore(
    (state) => state.setSearchAreaBBox
  );
  const searchArea = useSpotQueryStore((state) => state.spotQuery.area.type);
  const bounds = useMapStore((state) => state.bounds);

  const { isFetching, queryOSM } = useQueryOSMData({
    onSuccessCallbacks: [],
  });

  const handleSearchCurrentViewClick = () => {
    if (searchArea === "area") {
      setSearchAreaBBox([
        bounds[0][1],
        bounds[0][0],
        bounds[1][1],
        bounds[1][0],
      ]);
    }
    queryOSM();
  };

  return (
    <Button
      className="rounded-lg shadow-lg"
      ref={buttonRef}
      onClick={handleSearchCurrentViewClick}
      disabled={isFetching}
    >
      {isFetching ? (
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
