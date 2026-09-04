import type { PhoneScreenProps } from '../types';
import styles from './PhoneRequestsScreen.module.css';

/** 2o · App requests board · 390×844 phone screen, fluid via --pu. */
export default function PhoneRequestsScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App requests board">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Requests</div>
        <div className={styles.pill2} onClick={() => onNavigate('newRequest')} role="button" tabIndex={0}>＋ Post</div>
      </div>
      <div className={styles.row2}>
        <div className={styles.chip}>All · 6</div>
        <div className={styles.chip2}>Sport &amp; fitness</div>
        <div className={styles.chip2}>Music</div>
        <div className={styles.chip2}>Garden</div>
        <div className={styles.chip2}>Games</div>
        <div className={styles.chip3}>Open spots only</div>
        <div className={styles.chip3}>Sort: Soonest ↓</div>
      </div>
      <div className={styles.col}>
        <div className={styles.card} onClick={() => onNavigate('requestDetail')} role="button" tabIndex={0}>
          <div className={styles.avatar}>A</div>
          <div className={styles.box}><div className={styles.heading2}>Two more for 5-a-side</div><div className={styles.meta}>Aiden · Sat 16:00 · Camperdown Oval</div><div className={styles.meta2}>Casual game, all levels. Bring a dark shirt.</div></div>
          <div className={styles.chip4}>2 spots</div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('requestDetail')} role="button" tabIndex={0}>
          <div className={styles.avatar}>T</div>
          <div className={styles.box}><div className={styles.heading2}>Bass player for Sunday jam</div><div className={styles.meta}>Tien · Sun 14:00 · The Yard</div><div className={styles.meta2}>Blues and soul covers, amp provided.</div></div>
          <div className={styles.chip4}>1 spot</div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('requestDetail')} role="button" tabIndex={0}>
          <div className={styles.avatar}>J</div>
          <div className={styles.box}><div className={styles.heading2}>Help lifting garden beds</div><div className={styles.meta}>Josh · Sat 9:00 · Hollis Park</div><div className={styles.meta2}>One hour, four pairs of hands needed.</div></div>
          <div className={styles.chip4}>4 spots</div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('requestDetail')} role="button" tabIndex={0}>
          <div className={styles.avatar}>P</div>
          <div className={styles.box}><div className={styles.heading2}>Chess at the library, weekly</div><div className={styles.meta}>Peter · Wed 18:00 · Newtown Library</div><div className={styles.meta2}>Beginners very welcome, boards supplied.</div></div>
          <div className={styles.chip5}>Full</div>
        </div>
        <div className={styles.meta3}>Showing 4 of 6 · scroll for more</div>
      </div>
    </div>
  );
}
