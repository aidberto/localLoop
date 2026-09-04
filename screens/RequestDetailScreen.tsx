import KioskShell from '../KioskShell';
import PhoneHandoff from '../PhoneHandoff';
import type { KioskScreenProps } from '../types';
import styles from './RequestDetailScreen.module.css';

/** 1i · Request detail - 1920×1080 kiosk screen, fluid via --u. */
export default function RequestDetailScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Request detail">
      <KioskShell active="requestDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}><div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>← Back to the board</div><div className={styles.text}>Requests · Saturday basketball</div></div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.pill2}>SPORT</div><div className={styles.text2}>Tien · posted 2 h ago</div></div>
            <div className={styles.title}>Two more for Saturday basketball?</div>
            <div className={styles.row3}>
              <div className={styles.pill3}>2 slots left</div>
              <div className={styles.pill3}>Sat 9:00</div>
              <div className={styles.pill3}>Fraser Park courts</div>
            </div>
            <div className={styles.text3}>Friendly half-court game every Saturday morning, all skill levels genuinely welcome. We have a spare ball and bibs. Usually done by 10:30, then coffee across the road.</div>
            <div className={styles.box}></div>
            <div className={styles.row4}>
              <div className={styles.box2}><PhoneHandoff screen="requestDetail" color="#0C4B5C" seed={42} /></div>
              <div><div className={styles.heading}>Want in?</div><div className={styles.text4}>Scan the code and register for "Saturday basketball" in the LocalLoop app - the kiosk never asks for your details.</div></div>
            </div>
          </div>
          <div className={styles.col3}>
            <div className={styles.row5}>
              <div className={styles.mapPlaceholder}>map · kiosk → Fraser Park</div>
              <div className={styles.pin}>14 min walk · step-free</div>
            </div>
            <div className={styles.col4}>
              <div className={styles.heading2}>More from the board</div>
              <div className={styles.row6}>
                <div className={styles.box3}><div className={styles.text5}>Slow Sunday run crew, 5 km</div><div className={styles.text6}>Josh · Sun 7:30</div></div>
                <div className={styles.box3}><div className={styles.text5}>Chess in Camperdown park</div><div className={styles.text6}>Jacob · Sat 14:00</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row7}>
        <div className={styles.pill4} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row8}>
          <div className={styles.pill5} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill6} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill7} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill8} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row9}><div className={styles.text7}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
