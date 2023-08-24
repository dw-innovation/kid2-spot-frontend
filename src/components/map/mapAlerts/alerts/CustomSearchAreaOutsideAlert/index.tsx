import React from "react";

import { MapAlertProvider } from "../../Context";
import CustomSearchAreaOutsideAlert from "./CustomSearchAreaOutsideAlert";

const CustomSearchAreaOutsideAlertWithContext = () => (
  <MapAlertProvider>
    <CustomSearchAreaOutsideAlert />
  </MapAlertProvider>
);

export default CustomSearchAreaOutsideAlertWithContext;
