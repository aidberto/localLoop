import type { PhoneScreenProps } from '../types';
import styles from './PhoneConfirmationScreen.module.css';

/** 2d · App confirmation · 390×844 phone screen, fluid via --pu. */
export default function PhoneConfirmationScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App confirmation">
      <div className={styles.col}>
        <div className={styles.avatar}>✓</div>
        <div className={styles.title}>Application sent</div>
        <div className={styles.heading}>The Newtown community team reviews new members within <b className={styles.box}>2 business days</b>. We'll text you at 0412 555 013 as soon as you're approved.</div>
        <div className={styles.card}>
          <div className={styles.text}>While you wait, you can already:</div>
          <div className={styles.text2}>· Browse events and transport times</div>
          <div className={styles.text2}>· Read the community board</div>
          <div className={styles.text2}>· Save events to your calendar</div>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>Browse events</div>
        <div className={styles.pill2} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Return to home</div>
      </div>
    </div>
  );
}
