import React from "react";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => (
  <h2 className="text-xl font-bold">
    Edit OSM tags and rules for &quot;{name}&quot;
  </h2>
);

export default Header;
