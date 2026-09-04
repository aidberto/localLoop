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
  /** Navigate to another phone screen. */
  onNavigate: (screen: PhoneScreenId) => void;
}
