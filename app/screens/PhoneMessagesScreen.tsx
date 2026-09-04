import type { PhoneScreenProps } from '../types';
import styles from './PhoneMessagesScreen.module.css';

/** 2g · App messages · 390×844 phone screen, fluid via --pu. */
export default function PhoneMessagesScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App messages">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Messages</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.card} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.avatar}>A</div>
          <div className={styles.box2}><div className={styles.heading2}>Aiden</div><div className={styles.text}>Are you going today?</div></div>
          <div className={styles.col2}><div className={styles.chip}>2</div><div className={styles.meta}>11:52</div></div>
        </div>
        <div className={styles.card2} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.avatar2}>J</div>
          <div className={styles.box2}><div className={styles.heading3}>Josh</div><div className={styles.text2}>Hey do you want to go to this event?</div></div>
          <div className={styles.meta2}>10:31</div>
        </div>
        <div className={styles.card2} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.avatar3}>P</div>
          <div className={styles.box2}><div className={styles.heading3}>Peter</div><div className={styles.text2}>Eating a burger with the run crew 🍔</div></div>
          <div className={styles.meta2}>Yesterday</div>
        </div>
        <div className={styles.card2} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.avatar4}>J</div>
          <div className={styles.box2}><div className={styles.heading3}>Jacob</div><div className={styles.text2}>No honey mustard at the market stall 😞</div></div>
          <div className={styles.meta2}>Tue</div>
        </div>
        <div className={styles.card2} onClick={() => onNavigate('thread')} role="button" tabIndex={0}>
          <div className={styles.avatar5}>T</div>
          <div className={styles.box2}><div className={styles.heading3}>Tien</div><div className={styles.text2}>Bringing the spare ball on Saturday</div></div>
          <div className={styles.meta2}>Mon</div>
        </div>
        <div className={styles.meta3}>Unread chats are bold with a count. Visible in any light.</div>
      </div>
      <div className={styles.box3}><div className={styles.pill2}>＋ New message</div></div>
    </div>
  );
}
