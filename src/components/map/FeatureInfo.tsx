import React from "react";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => {
  return (
    <div>
      {feature.properties.name && (
        <h3 className="text-lg font-bold leading-tight">
          {feature.properties.name}
        </h3>
      )}
      {Object.keys(feature.properties).map((key, index) => (
        <span key={index} className="block">
          <strong>{key}</strong>: {feature.properties[key]}
        </span>
      ))}
    </div>
  );
};

export default FeatureInfo;
