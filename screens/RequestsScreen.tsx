import { useMemo, useState } from 'react';
import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import { requests } from '../data';
import styles from './RequestsScreen.module.css';

// ponytail: filter pills map a label to the categories it matches; "full" = no open spots.
const FILTERS: { label: string; cats: string[] }[] = [
  { label: 'Sport & fitness', cats: ['SPORT', 'RUN'] },
  { label: 'Music', cats: ['MUSIC'] },
  { label: 'Garden', cats: ['GARDEN'] },
  { label: 'Games', cats: ['GAMES'] },
  { label: 'Food', cats: ['FOOD'] },
];
const hasOpenSpots = (label: string) => !/full|waitlist/i.test(label);

/** 1h · Requests - 1920×1080 kiosk screen, fluid via --u. */
export default function RequestsScreen({ onNavigate }: KioskScreenProps) {
  const [active, setActive] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);

  const shown = useMemo(() => {
    const cats = FILTERS.find((f) => f.label === active)?.cats;
    return requests.filter(
      (r) =>
        (!cats || cats.includes(r.category)) &&
        (!openOnly || hasOpenSpots(r.slotsLabel)),
    );
  }, [active, openOnly]);

  return (
    <div className={styles.screen} data-screen-label="Requests">
      <KioskShell active="requests" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Newtown's board</div>
          <div className={styles.text}>Neighbours looking for people to join in</div>
          <div className={styles.box2}></div>
          <div className={styles.pill}>Post via the app</div>
        </div>
        <div className={styles.row2}>
          <div
            className={active === null ? styles.pill2 : styles.pill3}
            onClick={() => setActive(null)}
            role="button"
            tabIndex={0}
          >
            All · {requests.length}
          </div>
          {FILTERS.map((f) => (
            <div
              key={f.label}
              className={active === f.label ? styles.pill2 : styles.pill3}
              onClick={() => setActive(active === f.label ? null : f.label)}
              role="button"
              tabIndex={0}
            >
              {f.label}
            </div>
          ))}
          <div
            className={openOnly ? styles.pill2 : styles.pill3}
            onClick={() => setOpenOnly((v) => !v)}
            role="button"
            tabIndex={0}
          >
            Open spots only
          </div>
          <div className={styles.box2}></div>
          <div className={styles.pill4}>Sort · Newest ↓</div>
        </div>
        <div className={styles.grid}>
          {shown.map((r) => (
            <div
              key={r.id}
              className={styles.card}
              onClick={() => onNavigate('requestDetail', r.id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.row3}><div className={styles.chip}>{r.category}</div><div className={styles.text2}>{r.author} · {r.postedAt}</div></div>
              <div className={styles.heading}>{r.title}</div>
              <div className={styles.text3}>{r.blurb}</div>
              <div className={styles.row3}><div className={styles.text4}>{r.slotsLabel}</div><div className={styles.text5}>{r.whenLabel}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill5} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row5}>
          <div className={styles.pill6} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill7} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill8} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill9} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <div className={styles.row2}><div className={styles.text6}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
