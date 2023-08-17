import React from "react";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => (
  <div>
    <div className="pb-2 w-36">
      {feature.properties.tags.name && (
        <h3 className="text-lg font-bold leading-tight">
          {feature.properties.name}
        </h3>
      )}
      {feature.properties.osm_id && (
        <a
          href={`https://www.openstreetmap.org/node/${feature.properties.osm_id}`}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {feature.properties.osm_id}
        </a>
      )}
    </div>
    <span className="text-lg font-bold uppercase">
      Tags ({Object.keys(feature.properties.tags).length})
    </span>
    {Object.keys(feature.properties.tags).map((key, index) => (
      <span key={index} className="block">
        <strong>{key}</strong>: {feature.properties.tags[key]}
      </span>
    ))}
  </div>
);

export default FeatureInfo;
