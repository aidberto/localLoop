import type { PhoneScreenProps } from '../types';
import styles from './PhoneConfirmationScreen.module.css';

/** 2d · App confirmation · 390×844 phone screen, fluid via --pu.
 *  Two variants: new-member application (default) and the join confirmation
 *  shown after tapping Join on an event/request (when `confirmedLabel` is set). */
export default function PhoneConfirmationScreen({ onNavigate, confirmedLabel }: PhoneScreenProps) {
  if (confirmedLabel) {
    return (
      <div className={styles.screen} data-screen-label="App join confirmation">
        <div className={styles.col}>
          <div className={styles.avatar}>✓</div>
          <div className={styles.title}>You're in!</div>
          <div className={styles.heading}>You've joined <b className={styles.box}>{confirmedLabel}</b>. We'll share your first name with the host so they know to expect you.</div>
          <div className={styles.card}>
            <div className={styles.text}>What's next:</div>
            <div className={styles.text2}>· Added to your upcoming list</div>
            <div className={styles.text2}>· Get directions and bus times</div>
            <div className={styles.text2}>· We'll remind you before it starts</div>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Return to home</div>
          <div className={styles.pill2} onClick={() => onNavigate('events')} role="button" tabIndex={0}>Browse more</div>
        </div>
      </div>
    );
  }
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
