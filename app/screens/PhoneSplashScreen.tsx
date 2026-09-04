import type { PhoneScreenProps } from '../types';
import styles from './PhoneSplashScreen.module.css';

/** 2a · App splash · 390×844 phone screen, fluid via --pu. */
export default function PhoneSplashScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App splash">
      <div className={styles.col}>
        <div className={styles.avatar}></div>
        <div className={styles.title}>LocalLoop</div>
        <div className={styles.row}>
          <div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar4}></div><div className={styles.avatar5}></div>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.pill} onClick={() => onNavigate('scanKiosk')} role="button" tabIndex={0}>Tap to begin</div>
        <div className={styles.meta}>Your neighbourhood's events, transport and requests</div>
      </div>
    </div>
  );
}
