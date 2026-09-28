import { useEffect, useState } from 'react';
import KioskShell from '../KioskShell';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { busRoutes, fetchDepartures, modeColors, useClock, type Departure, type Mode } from '../data';
import styles from './TransportScreen.module.css';

const COLUMNS: { mode: Mode; heading: string; stop: string }[] = [
  { mode: 'bus', heading: 'Buses', stop: 'King St · Stop B' },
  { mode: 'train', heading: 'Trains', stop: 'Newtown Station' },
];

/** Three occupancy dots; filled = crowding + 1 (seats → standing only). */
function Dots({ crowding }: { crowding: 0 | 1 | 2 }) {
  return (
    <div className={styles.row4}>
      {[0, 1, 2].map((i) => (
        <div key={i} className={i <= crowding ? styles.avatar2 : styles.avatar3} />
      ))}
    </div>
  );
}

/** 1f · Transport - 1920×1080 kiosk screen, fluid via --u. */
export default function TransportScreen({ onNavigate, largeText, onLargeText }: KioskScreenProps) {
  const { now } = useClock();
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [status, setStatus] = useState<'loading' | 'live' | 'error'>('loading');

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const data = await fetchDepartures();
      if (!alive) return;
      if (data) { setDepartures(data); setStatus('live'); }
      else setStatus('error');
    };
    load();
    const id = setInterval(load, 30000); // refresh estimates every 30s
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Live rows carry a real timestamp → true countdown.
  const due = (d: Departure) => Math.max(0, Math.ceil((d.dueAt! - now) / 60000));

  return (
    <div className={styles.screen} data-screen-label="Transport">
      <KioskShell active="transport" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Transport in Newtown</div>
          <div className={styles.box2}></div>
          <div className={styles.text}><div className={styles.avatar}></div>{status === 'live' ? 'Live · Transport NSW' : status === 'loading' ? 'Loading…' : 'Departures unavailable'}</div>
        </div>
        <div className={styles.grid}>
          {COLUMNS.map(({ mode, heading, stop }) => {
            const rows = departures.filter((d) => d.mode === mode).sort((a, b) => due(a) - due(b)).slice(0, 5);
            return (
              <div key={mode} className={styles.col2}>
                <div className={styles.row2}><div className={styles.heading}>{heading}</div><div className={styles.text2}>{stop}</div></div>
                <div className={styles.col3}>
                  {rows.length === 0 && (
                    <div className={styles.meta}>{status === 'loading' ? 'Loading live departures…' : 'No live departures'}</div>
                  )}
                  {rows.map((d, i) => {
                    const clickable = Boolean(busRoutes[d.line]);
                    return (
                      <div
                        key={d.id}
                        className={i === rows.length - 1 ? styles.row5 : styles.row3}
                        onClick={clickable ? () => onNavigate('busDetail', d.line) : undefined}
                        role={clickable ? 'button' : undefined}
                        tabIndex={clickable ? 0 : undefined}
                      >
                        <div className={styles.text3} style={{ background: modeColors[d.mode].bg, color: modeColors[d.mode].fg }}>{d.line}</div>
                        <div className={styles.box3}><div className={styles.text4}>{d.dest}</div><div className={styles.meta}>{d.via}</div></div>
                        <div className={styles.box4}><div className={styles.heading2}>{due(d)} min</div><Dots crowding={d.crowding} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.text5}>Occupancy:
          <div className={styles.row6}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div> seats available
          <div className={styles.row7}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div> standing room only · Tap a service for its live route
        </div>
      </div>
      <div className={styles.row8}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row9}>
          <div className={styles.pill2} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Events</div>
          <div className={styles.pill3} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar5}></div>Map</div>
          <div className={styles.pill4} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Transport</div>
          <div className={styles.pill5} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
