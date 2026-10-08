import type { PhoneScreenProps } from '../types';
import styles from './PhoneNewEventScreen.module.css';

/** 2k · App new event · 390×844 phone screen, fluid via --pu. */
export default function PhoneNewEventScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App new event">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>‹ Events</div>
        <div className={styles.heading}>New event</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.col2}><div className={styles.text}>Event name</div><div className={styles.heading2} contentEditable suppressContentEditableWarning>Street library book swap</div></div>
        <div className={styles.col2}><div className={styles.text}>Date &amp; time</div><div className={styles.heading3}>Sat 30 Aug · 10:00<span className={styles.heading4}>🗓</span></div><div className={styles.meta}>Picked from a calendar, no typing, no typos.</div></div>
        <div className={styles.col2}><div className={styles.text}>Location</div><div className={styles.heading3}>Camperdown Rest Park<span className={styles.heading5}>📍</span></div></div>
        <div className={styles.col2}><div className={styles.text}>Photo</div>
          <div className={styles.upload} role="button" tabIndex={0}><span className={styles.uploadIcon}>🖼</span><span className={styles.uploadText}>Add a photo</span><span className={styles.meta}>Take one now or choose from your library</span></div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Price</div>
          <div className={styles.row2}><div className={styles.pill2}>Free</div><div className={styles.pill3}>Paid…</div></div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Description <span className={styles.box2}>(one short paragraph)</span></div><div className={styles.text2} contentEditable suppressContentEditableWarning>Bring a book, take a book. Kids' picture books especially welcome.</div></div>
        <div className={styles.meta2}>Events appear on the public Newtown kiosk. Keep it local and family-friendly. See posting guidelines.</div>
      </div>
      <div className={styles.col3}>
        <div className={styles.approval}><span className={styles.approvalBadge}>✓</span>Events are approved by the council board before they go live.</div>
        <div className={styles.pill4}>Preview event</div>
        <div className={styles.meta3}>You'll see it exactly as others will before it goes live. Edit or delete anytime.</div>
      </div>
    </div>
  );
}
