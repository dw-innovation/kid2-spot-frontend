import React from "react";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => (
  <div>
    <div className="pb-2">
      {feature.properties.name && (
        <h3 className="text-lg font-bold leading-tight">
          {feature.properties.name}
        </h3>
      )}
      {feature.properties.id && (
        <a
          href={`https://www.openstreetmap.org/${feature.properties.id}`}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {feature.properties.id}
        </a>
      )}
    </div>
    <span className="text-lg font-bold uppercase">
      Tags ({Object.keys(feature.properties).length})
    </span>
    {Object.keys(feature.properties).map((key, index) => (
      <span key={index} className="block">
        <strong>{key}</strong>: {feature.properties[key]}
      </span>
    ))}
  </div>
);

export default FeatureInfo;
