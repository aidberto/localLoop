export type PhoneScreenId =
  | 'splash'
  | 'scanKiosk'
  | 'newMember'
  | 'confirmation'
  | 'home'
  | 'inbox'
  | 'messages'
  | 'thread'
  | 'events'
  | 'eventDetail'
  | 'newEvent'
  | 'map'
  | 'transport'
  | 'routeDetail'
  | 'requests'
  | 'requestDetail'
  | 'newRequest';

export interface PhoneScreenProps {
  /** Navigate to another phone screen, optionally selecting an event/request. */
  onNavigate: (screen: PhoneScreenId, selectedId?: string) => void;
  /** Which event/request to show on detail screens (from the kiosk handoff). */
  selectedId?: string;
}
