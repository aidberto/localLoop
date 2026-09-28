import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import { departures, minutesLeft, useClock, type Departure, type Mode } from '../data';
import styles from './TransportScreen.module.css';

const COLUMNS: { mode: Mode; heading: string; stop: string }[] = [
  { mode: 'bus', heading: 'Buses', stop: 'King St · Stop B' },
  { mode: 'train', heading: 'Trains', stop: 'Newtown Station' },
  { mode: 'metro', heading: 'Metro', stop: 'Sydenham · M1' },
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
export default function TransportScreen({ onNavigate }: KioskScreenProps) {
  const { now, mountedAt } = useClock();
  const due = (d: Departure) => minutesLeft(d.dueInMin, mountedAt, now);

  return (
    <div className={styles.screen} data-screen-label="Transport">
      <KioskShell active="transport" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Transport in Newtown</div>
          <div className={styles.box2}></div>
          <div className={styles.text}><div className={styles.avatar}></div>Live · updated just now</div>
        </div>
        <div className={styles.grid}>
          {COLUMNS.map(({ mode, heading, stop }) => {
            const rows = departures.filter((d) => d.mode === mode).sort((a, b) => due(a) - due(b));
            return (
              <div key={mode} className={styles.col2}>
                <div className={styles.row2}><div className={styles.heading}>{heading}</div><div className={styles.text2}>{stop}</div></div>
                <div className={styles.col3}>
                  {rows.map((d, i) => {
                    const clickable = mode === 'bus' && d.routeId;
                    return (
                      <div
                        key={d.id}
                        className={i === rows.length - 1 ? styles.row5 : styles.row3}
                        onClick={clickable ? () => onNavigate('busDetail', d.routeId) : undefined}
                        role={clickable ? 'button' : undefined}
                        tabIndex={clickable ? 0 : undefined}
                      >
                        <div className={styles.text3}>{d.line}</div>
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
          <div className={styles.row7}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div> standing room only · Tap a bus for its live route
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
        <div className={styles.row10}><div className={styles.text6}>Text size</div><div className={styles.avatar8}>A</div><div className={styles.avatar9}>A</div></div>
      </div>
    </div>
  );
}
