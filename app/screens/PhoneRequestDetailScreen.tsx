import type { PhoneScreenProps } from '../types';
import styles from './PhoneRequestDetailScreen.module.css';

/** 2p · App request detail · 390×844 phone screen, fluid via --pu. */
export default function PhoneRequestDetailScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App request detail">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>‹ Requests</div>
        <div className={styles.heading}>5-a-side</div>
        <div className={styles.heading2}>♡</div>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>Two more for 5-a-side</div>
        <div className={styles.row2}>
          <div className={styles.avatar}>A</div>
          <div className={styles.box}><div className={styles.text}>Aiden</div><div className={styles.meta}>Newtown member since 2024 · 8 requests hosted</div></div>
        </div>
        <div className={styles.row3}>
          <div className={styles.chip}>Sat 16:00 – 17:30</div>
          <div className={styles.chip}>Camperdown Oval · 700 m</div>
          <div className={styles.chip}>Sport &amp; fitness</div>
        </div>
        <div className={styles.text2}>Casual game on the top pitch, all levels welcome. Bring a dark shirt and water. We usually head to the pub across the road afterwards.</div>
        <div className={styles.card}>
          <div className={styles.row4}><div className={styles.text3}>Going · 8 of 10</div><div className={styles.meta2}>2 spots left</div></div>
          <div className={styles.chip2}><div className={styles.box2}></div></div>
          <div className={styles.row5}>
            <div className={styles.avatar2}>A</div>
            <div className={styles.avatar2}>J</div>
            <div className={styles.avatar2}>T</div>
            <div className={styles.avatar2}>P</div>
            <div className={styles.avatar3}>+4</div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.heading3}>426</div>
          <div className={styles.box}><div className={styles.text4}>Bus from King St · 5 min away</div><div className={styles.meta3}>3 stops · get off at Australia St</div></div>
          <div className={styles.heading4}>→</div>
        </div>
        <div className={styles.meta4}>Joining shares your first name with Aiden and the others going. Nothing else. Report this listing</div>
      </div>
      <div className={styles.row6}>
        <div className={styles.pill2}>Join · 2 spots left</div>
        <div className={styles.pill3}>✉</div>
      </div>
    </div>
  );
}
