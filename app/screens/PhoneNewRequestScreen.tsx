import type { PhoneScreenProps } from '../types';
import styles from './PhoneNewRequestScreen.module.css';

/** 2q · App new request · 390×844 phone screen, fluid via --pu. */
export default function PhoneNewRequestScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App new request">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>‹ Requests</div>
        <div className={styles.heading}>New request</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.col2}><div className={styles.text}>What are you after?</div><div className={styles.heading2}>A fourth for doubles tennis</div></div>
        <div className={styles.col2}><div className={styles.text}>Category</div>
          <div className={styles.row2}>
            <div className={styles.chip}>Sport &amp; fitness</div>
            <div className={styles.chip2}>Music</div>
            <div className={styles.chip2}>Garden</div>
            <div className={styles.chip2}>Games</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Date &amp; time</div><div className={styles.heading3}>Sun 31 Aug · 08:30<span className={styles.heading4}>🗓</span></div></div>
        <div className={styles.col2}><div className={styles.text}>Where</div><div className={styles.heading3}>Camperdown Courts<span className={styles.heading5}>📍</span></div></div>
        <div className={styles.col2}><div className={styles.text}>How many people do you need?</div>
          <div className={styles.row3}>
            <div className={styles.heading6}>−</div>
            <div className={styles.heading7}>1 person</div>
            <div className={styles.heading8}>＋</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Anything else? <span className={styles.box2}>(optional)</span></div><div className={styles.text2}>Skill level, what to bring, how long you'll play…</div></div>
        <div className={styles.meta}>Requests show on the public Newtown kiosk with your first name only. They close automatically once the spots fill.</div>
      </div>
      <div className={styles.col3}>
        <div className={styles.pill2}>Preview request</div>
        <div className={styles.meta2}>You'll see it exactly as others will before it goes live. Edit or delete anytime.</div>
      </div>
    </div>
  );
}
