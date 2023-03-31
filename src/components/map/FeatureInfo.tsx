import React, { MouseEvent, useState } from "react";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => {
  const [showTags, setShowTags] = useState(false);
  const handleClick = (e: MouseEvent<HTMLDetailsElement>) => {
    e.stopPropagation();
    setShowTags(!showTags);
  };
  return (
    <div>
      {feature.tags?.name && (
        <h3 className="text-lg font-bold">{feature.tags.name}</h3>
      )}
      <span className="block">
        {feature.tags["addr:street"] && `${feature.tags["addr:street"]} `}

        {feature.tags["addr:housenumber"] &&
          `${feature.tags["addr:housenumber"]} `}
      </span>
      <span className="block">
        {feature.tags["addr:postcode"] && `${feature.tags["addr:postcode"]} `}
        {feature.tags["addr:city"] && feature.tags["addr:city"]}
      </span>
      <details onClick={handleClick} open={showTags} className="cursor-pointer">
        <summary>all tags</summary>
        <pre>{JSON.stringify(feature, null, 2)}</pre>
      </details>
    </div>
  );
};

export default FeatureInfo;
