import { useCallback, useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import type { KioskScreenProps, ScreenId } from './types';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import TransportScreen from './screens/TransportScreen';
import BusDetailScreen from './screens/BusDetailScreen';
import RequestsScreen from './screens/RequestsScreen';
import RequestDetailScreen from './screens/RequestDetailScreen';
import MapScreen from './screens/MapScreen';
import RegisterScreen from './screens/RegisterScreen';
import StandbyScreen from './screens/StandbyScreen';
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
  standby: StandbyScreen,
} satisfies Record<ScreenId, ComponentType<KioskScreenProps>>;

/** Idle window before the kiosk drops into standby. */
const IDLE_MS = 20000;

export interface KioskAppProps {
  /** Screen to open on first render. */
  initialScreen?: ScreenId;
}

export default function KioskApp({ initialScreen = 'home' }: KioskAppProps) {
  const [screen, setScreen] = useState<ScreenId>(initialScreen);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const onNavigate = useCallback((next: ScreenId, id?: string) => {
    setScreen(next);
    setSelectedId(id);
  }, []);

  // After IDLE_MS with no input, show standby. Any input while in standby
  // returns to home; otherwise input just resets the idle timer.
  useEffect(() => {
    let timer: number;
    const reset = () => {
      window.clearTimeout(timer);
      setScreen((cur) => (cur === 'standby' ? 'home' : cur));
      timer = window.setTimeout(() => setScreen('standby'), IDLE_MS);
    };
    const inputs = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart'];
    inputs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      window.clearTimeout(timer);
      inputs.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  const Screen = SCREENS[screen];
  return <Screen onNavigate={onNavigate} selectedId={selectedId} />;
}
