import type { PhoneScreenProps } from '../types';
import styles from './PhoneTransportScreen.module.css';

/** 2m · App transport board · 390×844 phone screen, fluid via --pu. */
export default function PhoneTransportScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App transport board">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Transport</div>
        <div className={styles.text}>⟳</div>
      </div>
      <div className={styles.col}>
        <div className={styles.row2}>
          <div className={styles.chip}>Buses</div>
          <div className={styles.chip2}>Trains</div>
          <div className={styles.chip2}>Metro</div>
        </div>
        <div className={styles.row3}>
          <div className={styles.text2}>King St · Stop B</div>
          <div className={styles.meta}>· 120 m away</div>
          <div className={styles.box}></div>
          <div className={styles.meta2}><div className={styles.avatar}></div>Live · just now</div>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
          <div className={styles.heading2}>422</div>
          <div className={styles.box2}><div className={styles.heading3}>Kogarah</div><div className={styles.meta3}>via St Peters · seats available</div></div>
          <div className={styles.box3}><div className={styles.heading4}>3 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
          <div className={styles.heading2}>426</div>
          <div className={styles.box2}><div className={styles.heading3}>Dulwich Hill</div><div className={styles.meta3}>via Marrickville Rd · some seats</div></div>
          <div className={styles.box3}><div className={styles.heading4}>5 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar3}></div></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
          <div className={styles.heading2}>428</div>
          <div className={styles.box2}><div className={styles.heading3}>Canterbury</div><div className={styles.meta3}>via Enmore Rd · seats available</div></div>
          <div className={styles.box3}><div className={styles.heading4}>8 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
          <div className={styles.heading2}>423</div>
          <div className={styles.box2}><div className={styles.heading3}>Kingsgrove</div><div className={styles.meta3}>via King St · standing room only</div></div>
          <div className={styles.box3}><div className={styles.heading4}>11 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div></div>
        </div>
        <div className={styles.card} onClick={() => onNavigate('routeDetail')} role="button" tabIndex={0}>
          <div className={styles.heading2}>370</div>
          <div className={styles.box2}><div className={styles.heading3}>Coogee</div><div className={styles.meta3}>via Alexandria · seats available</div></div>
          <div className={styles.box3}><div className={styles.heading4}>14 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div>
        </div>
        <div className={styles.meta4}>Dots show how full it is. One dot means seats available, three means standing room only. Tap a service for its live route.</div>
      </div>
      <div className={styles.box4}><div className={styles.pill2}>Change stop 📍</div></div>
    </div>
  );
}
