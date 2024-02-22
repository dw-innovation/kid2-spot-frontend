import React from "react";

import { capitalize } from "@/lib/utils";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => (
  <h2 className="text-xl font-bold">
    Edit OSM tags and rules for &quot;{capitalize(name)}&quot;
  </h2>
);

export default Header;
