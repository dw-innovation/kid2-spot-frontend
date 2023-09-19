import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";

import useResultsStore from "@/stores/useResultsStore";

const SearchArea = () => {
  const searchArea = useResultsStore((state) => state.searchArea);

  const stableKey = useMemo(() => {
    return Date.now().toString();
  }, [searchArea]);

  return (
    <>
      {searchArea ? (
        <GeoJSON
          key={stableKey}
          data={searchArea}
          style={{ fillColor: "transparent", color: "#34c3eb" }}
        />
      ) : null}
    </>
  );
};

export default SearchArea;
