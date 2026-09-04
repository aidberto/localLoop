import type { PhoneScreenProps } from '../types';
import styles from './PhoneEventsScreen.module.css';

/** 2i · App events list · 390×844 phone screen, fluid via --pu. */
export default function PhoneEventsScreen({ onNavigate }: PhoneScreenProps) {
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
        <div className={styles.card} onClick={() => onNavigate('eventDetail')} role="button" tabIndex={0}>
          <div className={styles.mapPlaceholder}>photo</div>
          <div className={styles.col2}><div className={styles.heading2}>Makers Market</div><div className={styles.meta}>In 2 h 15 m · 350 m · Free</div><div className={styles.meta2}>Forty local stalls, live music and street food along King St. <b className={styles.box}>See more</b></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('eventDetail')} role="button" tabIndex={0}>
          <div className={styles.mapPlaceholder}>photo</div>
          <div className={styles.col2}><div className={styles.heading2}>Open-mic at The Yard</div><div className={styles.meta}>Tonight 19:30 · 600 m · Free</div><div className={styles.meta2}>Five-minute slots for music, poetry and comedy. All welcome. <b className={styles.box}>See more</b></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('eventDetail')} role="button" tabIndex={0}>
          <div className={styles.mapPlaceholder}>photo</div>
          <div className={styles.col2}><div className={styles.heading2}>Garden working bee</div><div className={styles.meta}>Tomorrow 9:00 · 850 m · Free</div><div className={styles.meta2}>Plant the summer beds and share a cuppa with neighbours. <b className={styles.box}>See more</b></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('eventDetail')} role="button" tabIndex={0}>
          <div className={styles.mapPlaceholder}>photo</div>
          <div className={styles.col2}><div className={styles.heading2}>Vinyl fair at the Hub</div><div className={styles.meta}>Next Sat 10:00 · 1.1 km · $2</div><div className={styles.meta2}>Crates from 30 sellers, plus coffee and a swap table. <b className={styles.box}>See more</b></div></div>
        </div>
        <div className={styles.meta3}>Showing 4 of 11 · scroll for more</div>
      </div>
    </div>
  );
}
