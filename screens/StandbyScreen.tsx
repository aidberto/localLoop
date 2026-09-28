import { useEffect, useState } from 'react';
import type { KioskScreenProps } from '../types';
import {
  departures,
  events,
  formatIn,
  minutesLeft,
  requests,
  suburb,
  useClock,
} from '../data';
import styles from './StandbyScreen.module.css';

// Outdoorsy backdrops (Unsplash). They cross-fade on a timer.
const IMAGES = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80',
];
const IMAGE_MS = 9000;
const CARD_MS = 5000;

const clock = (ms: number) =>
  new Date(ms).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false });
const dateLabel = (ms: number) =>
  new Date(ms).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });

/** Idle standby / screensaver. One glanceable page — events, live transport and
 *  the community board at once — over rotating outdoor photography. Any input
 *  returns the kiosk to home (handled in KioskApp). */
export default function StandbyScreen({ onNavigate }: KioskScreenProps) {
  const { now, mountedAt } = useClock();
  const [bg, setBg] = useState(0);
  const [card, setCard] = useState(0);

  useEffect(() => {
    const bgId = setInterval(() => setBg((b) => (b + 1) % IMAGES.length), IMAGE_MS);
    const cardId = setInterval(() => setCard((c) => c + 1), CARD_MS);
    return () => {
      clearInterval(bgId);
      clearInterval(cardId);
    };
  }, []);

  const event = events[card % events.length];
  const request = requests[card % requests.length];

  const soonest = departures
    .map((d) => ({ ...d, min: minutesLeft(d.dueInMin, mountedAt, now) }))
    .sort((a, b) => a.min - b.min)
    .slice(0, 6);

  return (
    <div className={styles.screen} onClick={() => onNavigate('home')}>
      <div className={styles.bg}>
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className={`${styles.bgLayer} ${i === bg ? styles.bgOn : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.brand}><div className={styles.mark} />LocalLoop {suburb}</div>
            <div className={styles.date}>{dateLabel(now)}</div>
          </div>
          <div className={styles.clock}>{clock(now)}</div>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.panel} ${styles.panelWide}`}>
            <div className={styles.panelTitle}>Happening in {suburb}</div>
            <div key={event.id} className={styles.feature}>
              <div className={styles.photo} style={{ backgroundImage: `url(${event.image})`, backgroundColor: event.tint }}>
                <div className={styles.photoBadge}>{formatIn(minutesLeft(event.dueInMin, mountedAt, now))}</div>
              </div>
              <div className={styles.featureTitle}>{event.title}</div>
              <div className={styles.featureMeta}>{event.whenLabel}</div>
              <div className={styles.featureBlurb}>{event.blurb}</div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>Live departures</div>
            <div className={styles.list}>
              {soonest.map((d) => (
                <div key={d.id} className={styles.item}>
                  <div className={styles.line}>{d.line}</div>
                  <div className={styles.itemMain}>
                    <div className={styles.itemTitle}>{d.dest}</div>
                    <div className={styles.itemMeta}>{d.via}</div>
                  </div>
                  <div className={styles.badge}>{d.min} min</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>On the board</div>
            <div key={request.id} className={styles.feature}>
              <div className={styles.chip}>{request.category}</div>
              <div className={styles.featureTitle}>{request.title}</div>
              <div className={styles.featureMeta}>{request.author} · posted {request.postedAt}</div>
              <div className={styles.featureBlurb}>{request.blurb}</div>
              <div className={styles.requestFoot}>
                <div className={styles.badgeSm}>{request.slotsLabel}</div>
                <div className={styles.badgeSm}>{request.whenLabel}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.hint}>Touch anywhere to start</div>
        </div>
      </div>
    </div>
  );
}
