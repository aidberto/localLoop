import type { PhoneScreenProps } from '../types';
import styles from './PhoneRequestsScreen.module.css';

const isFull = (label: string) => /full|waitlist/i.test(label);

/** 2o · App requests board · 390×844 phone screen, fluid via --pu.
 *  Data-driven from the shared `requests` feed - same source as the kiosk. */
export default function PhoneRequestsScreen({ onNavigate, requests }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App requests board">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Requests</div>
        <div className={styles.pill2} onClick={() => onNavigate('newRequest')} role="button" tabIndex={0}>＋ Post</div>
      </div>
      <div className={styles.row2}>
        <div className={styles.chip}>All · {requests.length}</div>
        <div className={styles.chip2}>Sport &amp; fitness</div>
        <div className={styles.chip2}>Music</div>
        <div className={styles.chip2}>Garden</div>
        <div className={styles.chip2}>Games</div>
        <div className={styles.chip3}>Open spots only</div>
        <div className={styles.chip3}>Sort: Soonest ↓</div>
      </div>
      <div className={styles.col}>
        {requests.map((r) => (
          <div key={r.id} className={styles.card} onClick={() => onNavigate('requestDetail', r.id)} role="button" tabIndex={0}>
            <div className={styles.avatar}>{r.author.charAt(0)}</div>
            <div className={styles.box}>
              <div className={styles.heading2}>{r.title}</div>
              <div className={styles.meta}>{r.author} · {r.whenLabel} · {r.venue}</div>
              <div className={styles.meta2}>{r.blurb}</div>
            </div>
            <div className={isFull(r.slotsLabel) ? styles.chip5 : styles.chip4}>{r.slotsLabel}</div>
          </div>
        ))}
        <div className={styles.meta3}>Showing {requests.length} · scroll for more</div>
      </div>
    </div>
  );
}
