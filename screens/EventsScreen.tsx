import KioskShell from '../KioskShell';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { events, formatIn, minutesLeft, useClock } from '../data';
import styles from './EventsScreen.module.css';

/** 1d · Events - 1920×1080 kiosk screen, fluid via --u. */
export default function EventsScreen({ onNavigate, largeText, onLargeText }: KioskScreenProps) {
  const { now, mountedAt } = useClock();
  return (
    <div className={styles.screen} data-screen-label="Events">
      <KioskShell active="events" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Events in Newtown</div>
          <div className={styles.box2}></div>
          <div className={styles.row2}>
            <div className={styles.pill}>Today</div>
            <div className={styles.pill2}>This week</div>
            <div className={styles.pill2}>Free</div>
            <div className={styles.pill2}>Family</div>
            <div className={styles.pill3}>Sort · Soonest ↓</div>
          </div>
        </div>
        <div className={styles.col2}>
          {events.map((e) => (
            <div
              key={e.id}
              className={styles.row3}
              onClick={() => onNavigate('eventDetail', e.id)}
              role="button"
              tabIndex={0}
            >
              <div
                className={styles.mapPlaceholder}
                style={{ backgroundColor: e.tint, backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className={styles.col3}>
                <div className={styles.row4}>
                  <div className={styles.heading}>{e.title}</div>
                  <div className={styles.text}>Starts {formatIn(minutesLeft(e.dueInMin, mountedAt, now)).toLowerCase()}</div>
                </div>
                <div className={styles.text2}>{e.whenLabel}</div>
                <div className={styles.text3}>{e.blurb}</div>
              </div>
              <div className={styles.col4}>
                <div className={styles.pill4}>{e.distanceM} m away</div>
                <div className={styles.heading2}>→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.row5}>
        <div className={styles.pill5} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row6}>
          <div className={styles.pill6} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill7} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill8} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill9} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
