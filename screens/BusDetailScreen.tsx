import { useEffect, useState } from 'react';
import KioskShell from '../KioskShell';
import RouteMap from '../RouteMap';
import type { KioskScreenProps } from '../types';
import { busRoutes, fetchDepartures, modeColors, useClock, type Departure } from '../data';
import styles from './BusDetailScreen.module.css';

const CROWDING = ['seats available', 'some seats', 'standing room only'] as const;
const MODE_LABEL = { bus: 'Bus', train: 'Train', metro: 'Metro' } as const;

/** 1g · Route detail - 1920×1080 kiosk screen, fluid via --u. */
export default function BusDetailScreen({ onNavigate, selectedId }: KioskScreenProps) {
  const { now } = useClock();
  const route = (selectedId && busRoutes[selectedId]) || busRoutes['422'];
  const mode = route.mode ?? 'bus';
  const label = MODE_LABEL[mode];

  // Live next departure for this line, matched from the real feed.
  const [dep, setDep] = useState<Departure | null>(null);
  useEffect(() => {
    let alive = true;
    fetchDepartures().then((data) => {
      if (alive) setDep(data?.find((d) => d.line === route.line) ?? null);
    });
    return () => { alive = false; };
  }, [route.line]);

  const min = dep?.dueAt != null ? Math.max(0, Math.ceil((dep.dueAt - now) / 60000)) : null;
  const crowd = dep ? CROWDING[dep.crowding] : null;

  return (
    <div className={styles.screen} data-screen-label="Route detail">
      <KioskShell active="busDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.pill} onClick={() => onNavigate('transport')} role="button" tabIndex={0}>← All transport</div>
          <div className={styles.heading}>{route.line}</div>
          <div className={styles.heading2}>{route.headsign}</div>
          <div className={styles.box}></div>
          <div className={styles.heading3}>{min != null ? `Arriving in ${min} min · ${crowd}` : 'Checking live times…'}</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.heading4}>Stops from here</div>
            <div className={styles.col3}>
              {route.stops.map((s) => (
                <div key={s.name} className={styles.row2}>
                  <div className={s.current ? styles.avatar : s.last ? styles.avatar3 : styles.avatar2}></div>
                  <div className={s.current || s.last ? styles.text : styles.text3}>{s.name}</div>
                  <div className={styles.text2}>{s.time}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.row3}>
            <RouteMap stops={route.stops} color={modeColors[mode].bg} profile={mode === 'bus' ? 'driving' : undefined} className={styles.mapPlaceholder} />
            <div className={styles.pin}>
              <div className={styles.pill2}><div className={styles.avatar4}></div>You are here</div>
              <div className={styles.pill2}><div className={styles.avatar5}></div>{label} {route.line} · now</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill3} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row5}>
          <div className={styles.pill4} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Events</div>
          <div className={styles.pill5} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Map</div>
          <div className={styles.pill6} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar8}></div>Transport</div>
          <div className={styles.pill7} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar9}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row6}><div className={styles.text4}>Text size</div><div className={styles.avatar10}>A</div><div className={styles.avatar11}>A</div></div>
      </div>
    </div>
  );
}
