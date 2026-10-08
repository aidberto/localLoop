export const PHONE_SCREEN_IDS = [
  'splash',
  'scanKiosk',
  'newMember',
  'confirmation',
  'home',
  'events',
  'eventDetail',
  'newEvent',
  'map',
  'transport',
  'routeDetail',
  'requests',
  'requestDetail',
  'newRequest',
] as const;

export type PhoneScreenId = (typeof PHONE_SCREEN_IDS)[number];

import type { EventItem, RequestItem } from '../seed';

export interface PhoneScreenProps {
  /** Navigate to another phone screen, optionally selecting an event/request. */
  onNavigate: (screen: PhoneScreenId, selectedId?: string) => void;
  /** Which event/request to show on detail screens (from the kiosk handoff). */
  selectedId?: string;
  /** Live board, fetched + polled by PhoneApp (see useBoard). */
  events: EventItem[];
  requests: RequestItem[];
  /** Create a new event/request (used by the new-event / new-request forms). */
  createEvent: (item: EventItem) => void;
  createRequest: (item: RequestItem) => void;
  /** Remove an event/request (used by the detail screens). */
  deleteEvent: (id: string) => void;
  deleteRequest: (id: string) => void;
}
