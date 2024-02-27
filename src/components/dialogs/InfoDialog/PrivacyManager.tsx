import { Switch } from "@radix-ui/react-switch";
import React from "react";

import usePersistedStore from "@/stores/usePersistedStore";

const PrivacyManager = () => {
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled);
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);

  return (
    <div className="bg-red">
      <Switch
        checked={trackingEnabled}
        onCheckedChange={(checked) => toggleTracking(checked)}
        className="w-10 h-10"
      />
      <span>Tracking {trackingEnabled ? `enabled` : `disabled`}</span>
    </div>
  );
};

export default PrivacyManager;
