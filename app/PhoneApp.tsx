import { useCallback, useState } from 'react';
import type { ComponentType } from 'react';
import type { PhoneScreenId, PhoneScreenProps } from './types';
import PhoneSplashScreen from './screens/PhoneSplashScreen';
import PhoneScanKioskScreen from './screens/PhoneScanKioskScreen';
import PhoneNewMemberScreen from './screens/PhoneNewMemberScreen';
import PhoneConfirmationScreen from './screens/PhoneConfirmationScreen';
import PhoneHomeScreen from './screens/PhoneHomeScreen';
import PhoneEventsScreen from './screens/PhoneEventsScreen';
import PhoneEventDetailScreen from './screens/PhoneEventDetailScreen';
import PhoneNewEventScreen from './screens/PhoneNewEventScreen';
import PhoneMapScreen from './screens/PhoneMapScreen';
import PhoneTransportScreen from './screens/PhoneTransportScreen';
import PhoneRouteDetailScreen from './screens/PhoneRouteDetailScreen';
import PhoneRequestsScreen from './screens/PhoneRequestsScreen';
import PhoneRequestDetailScreen from './screens/PhoneRequestDetailScreen';
import PhoneNewRequestScreen from './screens/PhoneNewRequestScreen';
import PhoneNav from './PhoneNav';
import styles from './PhoneApp.module.css';
import '../theme.css';

/** Screens with no bottom nav: the home hub and the pre-login flow. */
const NAV_HIDDEN: PhoneScreenId[] = ['splash', 'scanKiosk', 'newMember', 'confirmation'];

const SCREENS = {
  splash: PhoneSplashScreen,
  scanKiosk: PhoneScanKioskScreen,
  newMember: PhoneNewMemberScreen,
  confirmation: PhoneConfirmationScreen,
  home: PhoneHomeScreen,
  events: PhoneEventsScreen,
  eventDetail: PhoneEventDetailScreen,
  newEvent: PhoneNewEventScreen,
  map: PhoneMapScreen,
  transport: PhoneTransportScreen,
  routeDetail: PhoneRouteDetailScreen,
  requests: PhoneRequestsScreen,
  requestDetail: PhoneRequestDetailScreen,
  newRequest: PhoneNewRequestScreen,
} satisfies Record<PhoneScreenId, ComponentType<PhoneScreenProps>>;

export interface PhoneAppProps {
  /** Screen to open on first render. */
  initialScreen?: PhoneScreenId;
  /** Event/request to show when opening straight onto a detail screen. */
  initialSelectedId?: string;
}

export default function PhoneApp({ initialScreen = 'splash', initialSelectedId }: PhoneAppProps) {
  const [screen, setScreen] = useState<PhoneScreenId>(initialScreen);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
  const onNavigate = useCallback((next: PhoneScreenId, id?: string) => {
    setScreen(next);
    if (id !== undefined) setSelectedId(id);
  }, []);
  const Screen = SCREENS[screen];
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <Screen onNavigate={onNavigate} selectedId={selectedId} />
      </div>
      {!NAV_HIDDEN.includes(screen) && <PhoneNav screen={screen} onNavigate={onNavigate} />}
    </div>
  );
}
