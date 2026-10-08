import type { EventItem, RequestItem } from './seed';

export type ScreenId =
  | 'home'
  | 'events'
  | 'eventDetail'
  | 'transport'
  | 'busDetail'
  | 'requests'
  | 'requestDetail'
  | 'map'
  | 'register'
  | 'addEvent'
  | 'standby';

export interface KioskScreenProps {
  /** Navigate to another kiosk screen, optionally selecting an item by id. */
  onNavigate: (screen: ScreenId, selectedId?: string) => void;
  /** Id of the item chosen on the previous screen (for detail screens). */
  selectedId?: string;
  /** Accessibility large-text mode (global, owned by KioskApp). */
  largeText?: boolean;
  /** Toggle large-text mode. */
  onLargeText?: (value: boolean) => void;
  /** Live board, fetched + polled by KioskApp (see useBoard). */
  events: EventItem[];
  requests: RequestItem[];
}

export interface KioskShellProps {
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  suburb?: string;
  time?: string;
  temperature?: string;
  showRegister?: boolean;
}
