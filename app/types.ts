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

export interface PhoneScreenProps {
  /** Navigate to another phone screen, optionally selecting an event/request. */
  onNavigate: (screen: PhoneScreenId, selectedId?: string) => void;
  /** Which event/request to show on detail screens (from the kiosk handoff). */
  selectedId?: string;
  /** Demo: whether the visitor has posted their request this session. */
  published?: boolean;
  /** Demo: mark the request as posted (shows it on the phone board). */
  onPublish?: () => void;
  /** Join an event/request: records the label and opens the confirmation screen. */
  onJoin?: (label: string) => void;
  /** What the visitor just joined — drives the join variant of the confirmation screen. */
  confirmedLabel?: string;
}
