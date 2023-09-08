import { UUID } from "short-uuid";

import AppStoreInterface from "./AppStore.interface";
import ImrStoreInterface from "./ImrStore.interface";
import MapStoreInterface from "./MapStore.interface";
import QueryStoreInterface from "./QueryStore.interface";
import StreetViewStoreInterface from "./StreetViewStore.interface";

export type Session = {
  id: UUID;
  name: string;
  description: string;
  created: string;
  modified: string;
  data: {
    useAppStore: AppStoreInterface;
    useMapStore: MapStoreInterface;
    useQueryStore: QueryStoreInterface;
    useStreetViewStore: StreetViewStoreInterface;
    useImrStore: ImrStoreInterface;
  };
};

export default interface SessionsStoreInterface {
  sessions: Session[];
  addSession: (session: Session) => void;
  removeSession: (id: string) => void;
  updateSession: (session: Session) => void;
}
