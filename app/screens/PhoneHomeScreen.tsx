import type { PhoneScreenProps } from '../types';
import styles from './PhoneHomeScreen.module.css';

/** 2e · App home · 390×844 phone screen, fluid via --pu. */
export default function PhoneHomeScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App home">
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.avatar}></div>
          <div className={styles.title}>LocalLoop</div>
          <div className={styles.box}></div>
          <div className={styles.text}>Newtown</div>
        </div>
        <div className={styles.title2}>Hi Five Man 👋</div>
        <div className={styles.card}>
          <div className={styles.heading}>✉</div>
          <div className={styles.box}><div className={styles.heading2}>Inbox</div><div className={styles.meta}>Aiden replied · basketball reminder</div></div>
          <div className={styles.chip}>3 NEW</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.col2} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.title3}>Events</div><div className={styles.text2}>3 today →</div></div>
          <div className={styles.col3} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.title4}>Requests</div><div className={styles.text3}>6 open →</div></div>
          <div className={styles.col4} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.title5}>Transport</div><div className={styles.text4}>422 · 3 min →</div></div>
          <div className={styles.col5} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.title6}>Map</div><div className={styles.text5}>Explore →</div></div>
        </div>
      </div>
    </div>
  );
}
