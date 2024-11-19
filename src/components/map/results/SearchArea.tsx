import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";

import useResultsStore from "@/stores/useResultsStore";

const SearchArea = () => {
  const searchArea = useResultsStore((state) => state.searchArea);
  const showSearchArea = useResultsStore((state) => state.showSearchArea);
  const highlightSearchArea = useResultsStore(
    (state) => state.highlightSearchArea
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableKey = useMemo(() => Date.now().toString(), [searchArea]);

  return (
    <>
      {searchArea && showSearchArea ? (
        <GeoJSON
          key={stableKey}
          data={searchArea}
          style={{
            fillColor: "blue",
            fillOpacity: 0.03,
            color: highlightSearchArea ? "red" : "#34c3eb",
            opacity: 0.6,
          }}
        />
      ) : null}
    </>
  );
};

export default SearchArea;
