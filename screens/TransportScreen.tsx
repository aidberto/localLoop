import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import styles from './TransportScreen.module.css';

/** 1f · Transport - 1920×1080 kiosk screen, fluid via --u. */
export default function TransportScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Transport">
      <KioskShell active="transport" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Transport in Newtown</div>
          <div className={styles.box2}></div>
          <div className={styles.text}><div className={styles.avatar}></div>Live · updated just now</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.heading}>Buses</div><div className={styles.text2}>King St · Stop B</div></div>
            <div className={styles.col3}>
              <div className={styles.row3}><div className={styles.text3}>422</div><div className={styles.box3}><div className={styles.text4}>Kogarah</div><div className={styles.meta}>via St Peters</div></div><div className={styles.box4}><div className={styles.heading2}>3 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>426</div><div className={styles.box3}><div className={styles.text4}>Dulwich Hill</div><div className={styles.meta}>via Marrickville Rd</div></div><div className={styles.box4}><div className={styles.heading2}>5 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>428</div><div className={styles.box3}><div className={styles.text4}>Canterbury</div><div className={styles.meta}>via Enmore Rd</div></div><div className={styles.box4}><div className={styles.heading2}>8 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>423</div><div className={styles.box3}><div className={styles.text4}>Kingsgrove</div><div className={styles.meta}>via King St</div></div><div className={styles.box4}><div className={styles.heading2}>11 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div></div></div>
              <div className={styles.row5}><div className={styles.text3}>370</div><div className={styles.box3}><div className={styles.text4}>Coogee</div><div className={styles.meta}>via Alexandria</div></div><div className={styles.box4}><div className={styles.heading2}>14 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
            </div>
          </div>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.heading}>Trains</div><div className={styles.text2}>Newtown Station</div></div>
            <div className={styles.col3}>
              <div className={styles.row3}><div className={styles.text3}>T2</div><div className={styles.box3}><div className={styles.text4}>City Circle</div><div className={styles.meta}>Platform 1</div></div><div className={styles.box4}><div className={styles.heading2}>2 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>T2</div><div className={styles.box3}><div className={styles.text4}>Leppington</div><div className={styles.meta}>Platform 2</div></div><div className={styles.box4}><div className={styles.heading2}>6 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>T2</div><div className={styles.box3}><div className={styles.text4}>City Circle</div><div className={styles.meta}>Platform 1</div></div><div className={styles.box4}><div className={styles.heading2}>12 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>T3</div><div className={styles.box3}><div className={styles.text4}>Lidcombe</div><div className={styles.meta}>Platform 2</div></div><div className={styles.box4}><div className={styles.heading2}>15 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row5}><div className={styles.text3}>T2</div><div className={styles.box3}><div className={styles.text4}>Leppington</div><div className={styles.meta}>Platform 2</div></div><div className={styles.box4}><div className={styles.heading2}>18 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
            </div>
          </div>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.heading}>Metro</div><div className={styles.text2}>Sydenham · M1</div></div>
            <div className={styles.col3}>
              <div className={styles.row3}><div className={styles.text3}>M1</div><div className={styles.box3}><div className={styles.text4}>Tallawong</div><div className={styles.meta}>via Central</div></div><div className={styles.box4}><div className={styles.heading2}>4 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>M1</div><div className={styles.box3}><div className={styles.text4}>Tallawong</div><div className={styles.meta}>via Central</div></div><div className={styles.box4}><div className={styles.heading2}>8 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>M1</div><div className={styles.box3}><div className={styles.text4}>Tallawong</div><div className={styles.meta}>via Central</div></div><div className={styles.box4}><div className={styles.heading2}>12 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
              <div className={styles.row3}><div className={styles.text3}>M1</div><div className={styles.box3}><div className={styles.text4}>Tallawong</div><div className={styles.meta}>via Central</div></div><div className={styles.box4}><div className={styles.heading2}>16 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div></div></div>
              <div className={styles.row5}><div className={styles.text3}>M1</div><div className={styles.box3}><div className={styles.text4}>Tallawong</div><div className={styles.meta}>via Central</div></div><div className={styles.box4}><div className={styles.heading2}>20 min</div><div className={styles.row4}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div></div></div>
            </div>
          </div>
        </div>
        <div className={styles.text5}>Occupancy:
          <div className={styles.row6}><div className={styles.avatar2}></div><div className={styles.avatar3}></div><div className={styles.avatar3}></div></div> seats available
          <div className={styles.row7}><div className={styles.avatar2}></div><div className={styles.avatar2}></div><div className={styles.avatar2}></div></div> standing room only · Tap a bus for its live route
        </div>
      </div>
      <div className={styles.row8}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row9}>
          <div className={styles.pill2} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Events</div>
          <div className={styles.pill3} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar5}></div>Map</div>
          <div className={styles.pill4} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Transport</div>
          <div className={styles.pill5} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <div className={styles.row10}><div className={styles.text6}>Text size</div><div className={styles.avatar8}>A</div><div className={styles.avatar9}>A</div></div>
      </div>
    </div>
  );
}
