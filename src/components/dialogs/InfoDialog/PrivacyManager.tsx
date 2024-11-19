import React from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import usePersistedStore from "@/stores/usePersistedStore";

const PrivacyManager = () => {
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled);
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);

  return (
    <div className="flex items-center gap-2 my-2">
      <Switch
        checked={trackingEnabled}
        onCheckedChange={(checked) => toggleTracking(checked)}
        id="tracking-enabled"
      />
      <Label htmlFor="tracking-enabled">
        Tracking {trackingEnabled ? `enabled` : `disabled`}
      </Label>
    </div>
  );
};

export default PrivacyManager;
