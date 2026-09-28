import type { PhoneScreenProps } from '../types';
import { events, formatIn, minutesLeft, useClock } from '../../data';
import styles from './PhoneEventsScreen.module.css';

/** 2i · App events list · 390×844 phone screen, fluid via --pu.
 *  Data-driven from the shared `events` feed — same source as the kiosk. */
export default function PhoneEventsScreen({ onNavigate }: PhoneScreenProps) {
  const { now, mountedAt } = useClock();
  return (
    <div className={styles.screen} data-screen-label="App events list">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Events</div>
        <div className={styles.pill2} onClick={() => onNavigate('newEvent')} role="button" tabIndex={0}>＋ New</div>
      </div>
      <div className={styles.row2}>
        <div className={styles.chip}>Today</div>
        <div className={styles.chip2}>This week</div>
        <div className={styles.chip2}>Free</div>
        <div className={styles.chip3}>Sort: Soonest ↓</div>
      </div>
      <div className={styles.col}>
        {events.map((e) => (
          <div key={e.id} className={styles.card} onClick={() => onNavigate('eventDetail', e.id)} role="button" tabIndex={0}>
            <div
              className={styles.mapPlaceholder}
              style={{ backgroundColor: e.tint, backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className={styles.col2}>
              <div className={styles.heading2}>{e.title}</div>
              <div className={styles.meta}>{formatIn(minutesLeft(e.dueInMin, mountedAt, now))} · {e.distanceM} m</div>
              <div className={styles.meta2}>{e.blurb}</div>
              <b className={styles.box}>See more</b>
            </div>
          </div>
        ))}
        <div className={styles.meta3}>Showing {events.length} of 11 · scroll for more</div>
      </div>
    </div>
  );
}
