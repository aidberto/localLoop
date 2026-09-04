import type { PhoneScreenProps } from '../types';
import styles from './PhoneRouteDetailScreen.module.css';

/** 2n · App route detail · 390×844 phone screen, fluid via --pu. */
export default function PhoneRouteDetailScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App route detail">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('transport')} role="button" tabIndex={0}>‹ Transport</div>
        <div className={styles.heading}>Route 422</div>
        <div className={styles.heading2}>♡</div>
      </div>
      <div className={styles.col}>
        <div className={styles.row2}>
          <div className={styles.title}>422</div>
          <div className={styles.box}><div className={styles.heading3}>Kogarah via St Peters</div><div className={styles.meta}>Arriving in 3 min · seats available</div></div>
        </div>
        <div className={styles.mapPlaceholder}>route map · live bus position
          <div className={styles.pin}>
            <div className={styles.chip}><div className={styles.avatar}></div>You are here</div>
            <div className={styles.chip}><div className={styles.avatar2}></div>Bus 422 · now</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.text}>Stops from here</div>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.avatar3}></div><div className={styles.text2}>King St, Stop B (you are here)</div><div className={styles.meta2}>12:03</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>Newtown Bridge</div><div className={styles.meta2}>12:05</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>St Peters Station</div><div className={styles.meta2}>12:09</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>Sydenham Station</div><div className={styles.meta2}>12:13</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>Tempe Shops</div><div className={styles.meta2}>12:17</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>Wolli Creek</div><div className={styles.meta2}>12:22</div></div>
            <div className={styles.row2}><div className={styles.avatar4}></div><div className={styles.text3}>Rockdale Plaza</div><div className={styles.meta2}>12:28</div></div>
            <div className={styles.row2}><div className={styles.avatar5}></div><div className={styles.text2}>Kogarah (last stop)</div><div className={styles.meta2}>12:34</div></div>
          </div>
        </div>
      </div>
      <div className={styles.row3}>
        <div className={styles.pill2}>Remind me at 12:00</div>
        <div className={styles.pill3}>↗</div>
      </div>
    </div>
  );
}
