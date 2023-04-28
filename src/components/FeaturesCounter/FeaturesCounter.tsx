import { FeatureCollection } from "geojson";
import React, { useEffect, useState } from "react";

import { countFeaturesByPrefix } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

const FeaturesCounter = () => {
  const [featuresCounter, setFeaturesCounter] = useState<
    Record<string, number>
  >({});
  const geoJSONResults = useResultsStore((state) => state.geoJSON);

  useEffect(() => {
    setFeaturesCounter(
      countFeaturesByPrefix(
        geoJSONResults as FeatureCollection & {
          features: {
            id: string;
          }[];
        }
      )
    );
  }, [geoJSONResults]);

  return (
    <div className="absolute bottom-0 right-0 z-[9999] bg-white p-1">
      {Object.entries(featuresCounter).map(([key, value]) => (
        <div key={key} className="flex items-center font-sans">
          <span className="text-sm text-gray-500">{key}</span>
          <span className="text-sm text-gray-500">: {value}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCounter;
