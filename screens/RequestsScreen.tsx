import { useEffect, useMemo, useState } from 'react';
import KioskShell from '../KioskShell';
import PhoneHandoff from '../PhoneHandoff';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { requests, bbqRequest } from '../data';
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
export default function RequestsScreen({ onNavigate, largeText, onLargeText }: KioskScreenProps) {
  const [active, setActive] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  // Demo: press "p" to toggle the handed-off BBQ request onto the board — this is how
  // the board "receives" the post on camera, and pressing again reverts it for re-takes.
  const [published, setPublished] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') setPublished((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const board = published ? [bbqRequest, ...requests] : requests;
  const shown = useMemo(() => {
    const cats = FILTERS.find((f) => f.label === active)?.cats;
    return board.filter(
      (r) =>
        (!cats || cats.includes(r.category)) &&
        (!openOnly || hasOpenSpots(r.slotsLabel)),
    );
  }, [active, openOnly, published]);

  return (
    <div className={styles.screen} data-screen-label="Requests">
      <KioskShell active="requests" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Newtown's board</div>
          <div className={styles.text}>Neighbours looking for people to join in</div>
          <div className={styles.box2}></div>
          <div className={styles.pill} onClick={() => setQrOpen(true)} role="button" tabIndex={0}>＋ Post via the app</div>
        </div>
        <div className={styles.row2}>
          <div
            className={active === null ? styles.pill2 : styles.pill3}
            onClick={() => setActive(null)}
            role="button"
            tabIndex={0}
          >
            All · {board.length}
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
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
      {qrOpen && (
        <div className={styles.overlay} onClick={() => setQrOpen(false)} role="button" tabIndex={0}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>Post your own request</div>
            <div className={styles.modalText}>Scan this with your phone camera to open the form and post to the board — the kiosk never asks for your details.</div>
            <div className={styles.modalQr}><PhoneHandoff screen="newRequest" color="#0C4B5C" /></div>
            <div className={styles.modalClose} onClick={() => setQrOpen(false)} role="button" tabIndex={0}>Close</div>
          </div>
        </div>
      )}
    </div>
  );
}
