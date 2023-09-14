import React from "react";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => (
  <div>
    <div className="pb-2">
      {feature.properties.tags.name && (
        <h3 className="text-lg font-bold leading-tight">
          {feature.properties.name}
        </h3>
      )}
      <a
        href={`https://www.openstreetmap.org/${feature.properties.osm_ids}`}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        Show Info on OpenStreetMap
      </a>
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
