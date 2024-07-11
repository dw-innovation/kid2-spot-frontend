import { UUID } from "short-uuid";

import AppStoreInterface from "./GlobalStore.interface";
import MapStoreInterface from "./MapStore.interface";
import SpotQueryStoreInterface from "./SpotQueryStore.interface";
import StreetViewStoreInterface from "./StreetViewStore.interface";

export type Session = {
  id: UUID;
  name: string;
  description: string;
  created: Date;
  modified: Date;
  data: {
    useGlobalStore: AppStoreInterface;
    useMapStore: MapStoreInterface;
    useStreetViewStore: StreetViewStoreInterface;
    useSpotQueryStore: SpotQueryStoreInterface;
  };
};

export default interface SessionsStoreInterface {
  sessions: Session[];
  addSession: (session: Session) => void;
  removeSession: (id: string) => void;
  updateSession: (session: Session) => void;
}
