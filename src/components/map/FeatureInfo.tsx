import { ExternalLinkIcon } from "@radix-ui/react-icons";

type Props = {
  feature: any;
};

const FeatureInfo = ({ feature }: Props) => (
  <div className="w-full">
    <div className="pb-2">
      {feature.properties.tags.name && (
        <h3 className="text-lg font-bold leading-tight">
          {feature.properties.tags.name}
        </h3>
      )}
    </div>
    <span>
      <strong>OSM ID: </strong>
      <a
        href={`https://www.openstreetmap.org/${feature.properties.osm_ids}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1"
      >
        {feature.properties.osm_ids}
        <ExternalLinkIcon />
      </a>
    </span>

    {Object.keys(feature.properties.tags).map((key, index) => (
      <span key={index} className="block">
        <strong>{key}</strong>: {feature.properties.tags[key]}
      </span>
    ))}
  </div>
);

export default FeatureInfo;
