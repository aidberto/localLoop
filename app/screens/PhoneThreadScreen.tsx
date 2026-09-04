import type { PhoneScreenProps } from '../types';
import styles from './PhoneThreadScreen.module.css';

/** 2h · App chat thread · 390×844 phone screen, fluid via --pu. */
export default function PhoneThreadScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App chat thread">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('messages')} role="button" tabIndex={0}>‹ Messages</div>
        <div className={styles.row2} data-thread="aiden"><div className={styles.avatar}>A</div><div className={styles.heading}>Aiden</div></div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.meta}>Today 11:40</div>
        <div className={styles.box2}><div className={styles.card}>Hey! Did you see the Makers Market is on at 12?</div><div className={styles.meta2}>Aiden · 11:40</div></div>
        <div className={styles.box3}><div className={styles.card2}>Yes! I was going to ask if you wanted to come with</div><div className={styles.meta3}>You · 11:45 · Delivered</div></div>
        <div className={styles.box2}><div className={styles.card}>Are you going today?</div><div className={styles.meta2}>Aiden · 11:52</div></div>
        <div className={styles.box3}><div className={styles.card2}>Meet you at the kiosk at 11:55? We can catch the 422</div><div className={styles.meta3}>You · 11:53 · Read</div></div>
        <div className={styles.box4}><div className={styles.row3}><div className={styles.mapPlaceholder}></div><div><div className={styles.meta4}>Makers Market</div><div className={styles.meta5}>Shared event · Sat 12:00 · Free</div></div></div></div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill2}>Message Aiden…</div>
        <div className={styles.avatar2}>➤</div>
      </div>
    </div>
  );
}
