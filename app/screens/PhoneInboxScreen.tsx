import type { PhoneScreenProps } from '../types';
import styles from './PhoneInboxScreen.module.css';

/** 2f · App inbox · 390×844 phone screen, fluid via --pu. */
export default function PhoneInboxScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App inbox">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Inbox</div>
        <div className={styles.meta}>Mark read</div>
      </div>
      <div className={styles.col}>
        <div className={styles.meta2}>TODAY</div>
        <div className={styles.card} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.heading2}>✉</div>
          <div className={styles.box}><div className={styles.text}>Aiden replied to you</div><div className={styles.text2}>"Are you going today?"</div></div>
          <div className={styles.col2}><div className={styles.chip}>NEW</div><div className={styles.meta3}>11:52</div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.heading3}>★</div>
          <div className={styles.box}><div className={styles.text}>Makers Market starts in 2 h</div><div className={styles.text2}>Saved event · Camperdown Rest Park</div></div>
          <div className={styles.col2}><div className={styles.chip}>NEW</div><div className={styles.meta3}>10:00</div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.heading2}>✋</div>
          <div className={styles.box}><div className={styles.text}>A spot opened up</div><div className={styles.text2}>"Saturday basketball" · 1 slot left</div></div>
          <div className={styles.col2}><div className={styles.chip}>NEW</div><div className={styles.meta3}>9:14</div></div>
        </div>
        <div className={styles.meta4}>EARLIER</div>
        <div className={styles.card2}>
          <div className={styles.heading4}>✓</div>
          <div className={styles.box}><div className={styles.text3}>You joined "Slow Sunday run crew"</div><div className={styles.text4}>Sun 7:30 · Cooks River path</div></div>
          <div className={styles.meta5}>Yesterday</div>
        </div>
        <div className={styles.card2}>
          <div className={styles.heading5}>ⓘ</div>
          <div className={styles.box}><div className={styles.text3}>422 detour ended</div><div className={styles.text4}>Normal route via St Peters resumed</div></div>
          <div className={styles.meta5}>Mon</div>
        </div>
        <div className={styles.meta6}>This inbox only shows alerts. Chats live in Messages.</div>
      </div>
      <div className={styles.box2}><div className={styles.pill2}>Open Messages</div></div>
    </div>
  );
}
