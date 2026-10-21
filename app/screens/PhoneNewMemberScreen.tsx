import type { PhoneScreenProps } from '../types';
import styles from './PhoneNewMemberScreen.module.css';

/** 2c · App new member · 390×844 phone screen, fluid via --pu. */
export default function PhoneNewMemberScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App new member">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('scanKiosk')} role="button" tabIndex={0}>‹ Back</div>
        <div className={styles.heading}>Join LocalLoop</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.col2}><div className={styles.text}>Full name</div><div className={styles.heading2} contentEditable suppressContentEditableWarning>Jacob Mulberry</div></div>
        <div className={styles.col2}><div className={styles.text}>Mobile number</div><div className={styles.heading2} contentEditable suppressContentEditableWarning>0412 555 013</div><div className={styles.meta}>Only used to text you a sign-in code. Never shown to others.</div></div>
        <div className={styles.col2}><div className={styles.text}>Suburb</div><div className={styles.heading3}>Newtown<span className={styles.box2}>▾</span></div><div className={styles.meta}>Set from the kiosk you scanned.</div></div>
        <div className={styles.col2}><div className={styles.text}>Address</div><div className={styles.heading2} contentEditable suppressContentEditableWarning>21 Jump Street</div></div>
        <div className={styles.col2}><div className={styles.text}>Email <span className={styles.box3}>(optional)</span></div><div className={styles.heading4} contentEditable suppressContentEditableWarning>you@example.com</div></div>
      </div>
      <div className={styles.col4}>
        <div className={styles.pill2} onClick={() => onNavigate('confirmation')} role="button" tabIndex={0}>Send application</div>
        <div className={styles.meta3}>Reviewed by the Newtown community team. See why we ask for these details</div>
      </div>
    </div>
  );
}
