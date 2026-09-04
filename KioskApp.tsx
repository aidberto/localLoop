import { useCallback, useState } from 'react';
import type { ComponentType } from 'react';
import type { ScreenId } from './types';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import TransportScreen from './screens/TransportScreen';
import BusDetailScreen from './screens/BusDetailScreen';
import RequestsScreen from './screens/RequestsScreen';
import RequestDetailScreen from './screens/RequestDetailScreen';
import MapScreen from './screens/MapScreen';
import RegisterScreen from './screens/RegisterScreen';
import './theme.css';

const SCREENS = {
  home: HomeScreen,
  events: EventsScreen,
  eventDetail: EventDetailScreen,
  transport: TransportScreen,
  busDetail: BusDetailScreen,
  requests: RequestsScreen,
  requestDetail: RequestDetailScreen,
  map: MapScreen,
  register: RegisterScreen,
} satisfies Record<ScreenId, ComponentType<{ onNavigate: (s: ScreenId) => void }>>;

export interface KioskAppProps {
  /** Screen to open on first render. */
  initialScreen?: ScreenId;
}

export default function KioskApp({ initialScreen = 'home' }: KioskAppProps) {
  const [screen, setScreen] = useState<ScreenId>(initialScreen);
  const onNavigate = useCallback((next: ScreenId) => setScreen(next), []);
  const Screen = SCREENS[screen];
  return <Screen onNavigate={onNavigate} />;
}
