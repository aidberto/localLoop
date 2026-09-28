import { useEffect, useState } from 'react';
import type { PhoneScreenProps } from '../types';
import { departures as mockDepartures, fetchDepartures, modeColors, useClock, type Departure, type Mode } from '../../data';
import styles from './PhoneTransportScreen.module.css';

const TABS: { mode: Mode; label: string; stop: string; distance: string }[] = [
  { mode: 'bus', label: 'Buses', stop: 'King St · Stop B', distance: '120 m away' },
  { mode: 'train', label: 'Trains', stop: 'Newtown Station', distance: '80 m away' },
];

const CROWDING = ['seats available', 'some seats', 'standing room only'] as const;

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

/** 2m · App transport board · 390×844 phone screen, fluid via --pu.
 *  Same live TfNSW feed as the kiosk (see screens/TransportScreen.tsx). */
export default function PhoneTransportScreen({ onNavigate }: PhoneScreenProps) {
  const { now } = useClock();
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [status, setStatus] = useState<'loading' | 'live' | 'error'>('loading');
  const [mode, setMode] = useState<Mode>('bus');

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const data = await fetchDepartures();
      if (!alive) return;
      if (data) { setDepartures(data); setStatus('live'); }
      else { setDepartures(mockDepartures); setStatus('error'); }
    };
    load();
    const id = setInterval(load, 30000); // refresh estimates every 30s
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Live rows carry a real timestamp → true countdown; mock rows use dueInMin.
  const due = (d: Departure) =>
    d.dueAt != null ? Math.max(0, Math.ceil((d.dueAt - now) / 60000)) : d.dueInMin;

  const tab = TABS.find((t) => t.mode === mode)!;
  const rows = departures.filter((d) => d.mode === mode).sort((a, b) => due(a) - due(b)).slice(0, 5);

  return (
    <div className={styles.screen} data-screen-label="App transport board">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Transport</div>
        <div className={styles.text}>⟳</div>
      </div>
      <div className={styles.col}>
        <div className={styles.row2}>
          {TABS.map((t) => (
            <div
              key={t.mode}
              className={t.mode === mode ? styles.chip : styles.chip2}
              onClick={() => setMode(t.mode)}
              role="button"
              tabIndex={0}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div className={styles.row3}>
          <div className={styles.text2}>{tab.stop}</div>
          <div className={styles.meta}>· {tab.distance}</div>
          <div className={styles.box}></div>
          <div className={styles.meta2}>
            <div className={styles.avatar}></div>
            {status === 'live' ? 'Live · just now' : status === 'loading' ? 'Loading…' : 'Estimated'}
          </div>
        </div>
      </div>
      <div className={styles.col2}>
        {rows.length === 0 && (
          <div className={styles.meta3}>{status === 'loading' ? 'Loading live departures…' : 'No departures'}</div>
        )}
        {rows.map((d) => (
          <div key={d.id} className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
            <div className={styles.heading2} style={{ background: modeColors[d.mode].bg, color: modeColors[d.mode].fg }}>{d.line}</div>
            <div className={styles.box2}><div className={styles.heading3}>{d.dest}</div><div className={styles.meta3}>{d.via} · {CROWDING[d.crowding]}</div></div>
            <div className={styles.box3}><div className={styles.heading4}>{due(d)} min</div><Dots crowding={d.crowding} /></div>
          </div>
        ))}
        <div className={styles.meta4}>Dots show how full it is. One dot means seats available, three means standing room only. Tap a service for its live route.</div>
      </div>
      <div className={styles.box4}><div className={styles.pill2}>Change stop 📍</div></div>
    </div>
  );
}
