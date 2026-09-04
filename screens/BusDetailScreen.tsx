import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import styles from './BusDetailScreen.module.css';

/** 1g · Bus route - 1920×1080 kiosk screen, fluid via --u. */
export default function BusDetailScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Bus route">
      <KioskShell active="busDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.pill} onClick={() => onNavigate('transport')} role="button" tabIndex={0}>← All transport</div>
          <div className={styles.heading}>422</div>
          <div className={styles.heading2}>Kogarah via St Peters</div>
          <div className={styles.box}></div>
          <div className={styles.heading3}>Arriving in 3 min · seats available</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.heading4}>Stops from here</div>
            <div className={styles.col3}>
              <div className={styles.row2}><div className={styles.avatar}></div><div className={styles.text}>King St, Stop B - you are here</div><div className={styles.text2}>12:03</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>Newtown Bridge</div><div className={styles.text2}>12:05</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>St Peters Station</div><div className={styles.text2}>12:09</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>Sydenham Station</div><div className={styles.text2}>12:13</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>Tempe Shops</div><div className={styles.text2}>12:17</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>Wolli Creek</div><div className={styles.text2}>12:22</div></div>
              <div className={styles.row2}><div className={styles.avatar2}></div><div className={styles.text3}>Rockdale Plaza</div><div className={styles.text2}>12:28</div></div>
              <div className={styles.row2}><div className={styles.avatar3}></div><div className={styles.text}>Kogarah - last stop</div><div className={styles.text2}>12:34</div></div>
            </div>
          </div>
          <div className={styles.row3}>
            <div className={styles.mapPlaceholder}>route map · live bus position</div>
            <div className={styles.pin}>
              <div className={styles.pill2}><div className={styles.avatar4}></div>You are here</div>
              <div className={styles.pill2}><div className={styles.avatar5}></div>Bus 422 · now</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill3} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row5}>
          <div className={styles.pill4} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Events</div>
          <div className={styles.pill5} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Map</div>
          <div className={styles.pill6} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar8}></div>Transport</div>
          <div className={styles.pill7} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar9}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row6}><div className={styles.text4}>Text size</div><div className={styles.avatar10}>A</div><div className={styles.avatar11}>A</div></div>
      </div>
    </div>
  );
}
