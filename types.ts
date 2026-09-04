export type ScreenId =
  | 'home'
  | 'events'
  | 'eventDetail'
  | 'transport'
  | 'busDetail'
  | 'requests'
  | 'requestDetail'
  | 'map'
  | 'register';

export interface KioskScreenProps {
  /** Navigate to another kiosk screen. */
  onNavigate: (screen: ScreenId) => void;
}

export interface KioskShellProps {
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  suburb?: string;
  time?: string;
  temperature?: string;
  showRegister?: boolean;
}
