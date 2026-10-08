import { useCallback, useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import type { KioskScreenProps, ScreenId } from './types';
import { useBoard } from './data';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import TransportScreen from './screens/TransportScreen';
import BusDetailScreen from './screens/BusDetailScreen';
import RequestsScreen from './screens/RequestsScreen';
import RequestDetailScreen from './screens/RequestDetailScreen';
import MapScreen from './screens/MapScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddEventScreen from './screens/AddEventScreen';
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
  addEvent: AddEventScreen,
  standby: StandbyScreen,
} satisfies Record<ScreenId, ComponentType<KioskScreenProps>>;

/** Idle window before the kiosk drops into standby. */
const IDLE_MS = 60000;

export interface KioskAppProps {
  /** Screen to open on first render. */
  initialScreen?: ScreenId;
}

export default function KioskApp({ initialScreen = 'home' }: KioskAppProps) {
  const [screen, setScreen] = useState<ScreenId>(initialScreen);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [largeText, setLargeText] = useState(false);
  // Live board (events + requests) - polled so phone-side posts show up here.
  const { events, requests } = useBoard();
  const onNavigate = useCallback((next: ScreenId, id?: string) => {
    setScreen(next);
    setSelectedId(id);
  }, []);

  // After IDLE_MS with no input, drop into standby. Standby is only dismissed by
  // clicking the screen (handled in StandbyScreen); other input just resets the
  // idle timer. Backspace force-shows standby from anywhere.
  useEffect(() => {
    let timer: number;
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setScreen('standby'), IDLE_MS);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        setScreen('standby');
      }
      reset();
    };
    // Note: no pointermove - passive mouse motion must not wake the kiosk.
    const activity = ['pointerdown', 'wheel', 'touchstart'];
    activity.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    window.addEventListener('keydown', onKey);
    reset();
    return () => {
      window.clearTimeout(timer);
      activity.forEach((e) => window.removeEventListener(e, reset));
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const Screen = SCREENS[screen];
  return (
    <div className={largeText ? 'llFrame llLarge' : 'llFrame'}>
      <Screen
        key={`${screen}:${selectedId ?? ''}`}
        onNavigate={onNavigate}
        selectedId={selectedId}
        largeText={largeText}
        onLargeText={setLargeText}
        events={events}
        requests={requests}
      />
    </div>
  );
}
