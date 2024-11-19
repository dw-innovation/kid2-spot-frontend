import React from "react";

import { MapAlertProvider } from "@/components/map/mapAlerts/Context";

import CustomSearchAreaOutsideAlert from "./CustomSearchAreaOutsideAlert";

const CustomSearchAreaOutsideAlertWithContext = () => (
  <MapAlertProvider>
    <CustomSearchAreaOutsideAlert />
  </MapAlertProvider>
);

export default CustomSearchAreaOutsideAlertWithContext;
