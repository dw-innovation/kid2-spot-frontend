import React from "react";

import { MenuProvider } from "./Context";
import Header from "./Header";

const HeaderWithContext = () => (
  <MenuProvider>
    <Header />
  </MenuProvider>
);

export default HeaderWithContext;
