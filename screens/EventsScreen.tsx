import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import styles from './EventsScreen.module.css';

/** 1d · Events - 1920×1080 kiosk screen, fluid via --u. */
export default function EventsScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Events">
      <KioskShell active="events" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Events in Newtown</div>
          <div className={styles.box2}></div>
          <div className={styles.row2}>
            <div className={styles.pill}>Today</div>
            <div className={styles.pill2}>This week</div>
            <div className={styles.pill2}>Free</div>
            <div className={styles.pill2}>Family</div>
            <div className={styles.pill3}>Sort · Soonest ↓</div>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.row3} onClick={() => onNavigate('eventDetail')} role="button" tabIndex={0}>
            <div className={styles.mapPlaceholder}>event photo</div>
            <div className={styles.col3}>
              <div className={styles.row4}><div className={styles.heading}>Makers Market</div><div className={styles.text}>Starts in 2 h 15 m</div></div>
              <div className={styles.text2}>Sat 12:00 – 17:00 · Camperdown Memorial Rest Park · Free</div>
              <div className={styles.text3}>Forty local stalls of ceramics, prints, plants and street food, with live acoustic sets from 2 pm and a kids' craft corner run by the library.</div>
            </div>
            <div className={styles.col4}><div className={styles.pill4}>350 m away</div><div className={styles.heading2}>→</div></div>
          </div>
          <div className={styles.row3}>
            <div className={styles.mapPlaceholder}>event photo</div>
            <div className={styles.col3}>
              <div className={styles.row4}><div className={styles.heading}>Open-mic night at The Yard</div><div className={styles.text}>Starts in 7 h 30 m</div></div>
              <div className={styles.text2}>Tonight 19:30 · The Yard, King St · Free entry</div>
              <div className={styles.text3}>Five-minute slots for music, poetry and comedy. Sign-up sheet opens at 19:00 - beginners get the friendliest crowd in the Inner West.</div>
            </div>
            <div className={styles.col4}><div className={styles.pill4}>600 m away</div><div className={styles.heading2}>→</div></div>
          </div>
          <div className={styles.row3}>
            <div className={styles.mapPlaceholder}>event photo</div>
            <div className={styles.col3}>
              <div className={styles.row4}><div className={styles.heading}>Community garden working bee</div><div className={styles.text}>Tomorrow 9:00</div></div>
              <div className={styles.text2}>Sun 9:00 – 12:00 · Wilson St gardens · Free, tools provided</div>
              <div className={styles.text3}>Help plant the summer beds and take home seedlings. Morning tea provided by the garden crew - kids and first-timers welcome.</div>
            </div>
            <div className={styles.col4}><div className={styles.pill4}>850 m away</div><div className={styles.heading2}>→</div></div>
          </div>
        </div>
      </div>
      <div className={styles.row5}>
        <div className={styles.pill5} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row6}>
          <div className={styles.pill6} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill7} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill8} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill9} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <div className={styles.row7}><div className={styles.text4}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
