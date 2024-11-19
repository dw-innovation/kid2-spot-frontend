export interface PersistedStoreInterface {
  trackingEnabled: boolean;
  toggleTracking: (newState?: boolean) => void;
}
