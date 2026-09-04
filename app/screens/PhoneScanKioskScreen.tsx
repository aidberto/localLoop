import type { PhoneScreenProps } from '../types';
import styles from './PhoneScanKioskScreen.module.css';

/** 2b · App scan kiosk QR · 390×844 phone screen, fluid via --pu. */
export default function PhoneScanKioskScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App scan kiosk QR">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('splash')} role="button" tabIndex={0}>‹ Back</div>
        <div className={styles.heading}>Scan a kiosk code</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.row2}>
          <div className={styles.pin}></div>
          <div className={styles.pin2}></div>
          <div className={styles.pin3}></div>
          <div className={styles.pin4}></div>
          <div className={styles.row3}><div className={styles.box2}></div></div>
        </div>
        <div className={styles.text}>Point your camera at the QR code on any LocalLoop kiosk</div>
      </div>
      <div className={styles.card}>
        <div className={styles.row4}>
          <div className={styles.avatar}>✓</div>
          <div><div className={styles.heading2}>Code found: Newtown kiosk</div><div className={styles.meta}>You'll join this suburb's loop</div></div>
        </div>
        <div className={styles.pill2} onClick={() => onNavigate('newMember')} role="button" tabIndex={0}>Add my details</div>
        <div className={styles.meta2}>No kiosk nearby? Join with your mobile number instead.</div>
      </div>
    </div>
  );
}
