import React from "react";

import { MapAlertProvider } from "../../Context";
import ResultsOutsideAlert from "./ResultsOutsideAlert";

const ResultsOutsideAlertWithContext = () => (
  <MapAlertProvider>
    <ResultsOutsideAlert />
  </MapAlertProvider>
);

export default ResultsOutsideAlertWithContext;
