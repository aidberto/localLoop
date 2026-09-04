import KioskShell from '../KioskShell';
import PhoneHandoff from '../PhoneHandoff';
import type { KioskScreenProps } from '../types';
import styles from './EventDetailScreen.module.css';

/** 1e · Event detail - 1920×1080 kiosk screen, fluid via --u. */
export default function EventDetailScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Event detail">
      <KioskShell active="eventDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}><div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>← All events</div><div className={styles.text}>Events · Makers Market</div></div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.mapPlaceholder}>event photo</div>
            <div className={styles.title}>Makers Market</div>
            <div className={styles.row2}>
              <div className={styles.pill2}>Sat 12:00 – 17:00</div>
              <div className={styles.pill2}>Camperdown Memorial Rest Park</div>
              <div className={styles.pill2}>Free entry</div>
            </div>
            <div className={styles.text2}>Forty local stalls of ceramics, prints, plants and street food. Live acoustic sets from 2 pm, and a kids' craft corner run by the Newtown library. Dogs on leads welcome.</div>
            <div className={styles.box}></div>
            <div className={styles.row3}>
              <div className={styles.box2}><PhoneHandoff screen="eventDetail" color="#2B2723" seed={7} /></div>
              <div><div className={styles.text3}>Take it with you</div><div className={styles.text4}>Scan to save this event and get a reminder on your phone.</div></div>
            </div>
          </div>
          <div className={styles.col3}>
            <div className={styles.col4}>
              <div className={styles.heading}>Getting there</div>
              <div className={styles.row4}>
                <div className={styles.mapPlaceholder2}>map · kiosk → venue</div>
                <div className={styles.col5}>
                  <div className={styles.row5}><div className={styles.text5}>422</div><div className={styles.text6}>Bus · 3 min away<div className={styles.text7}>2 stops · get off at Newtown Bridge</div></div></div>
                  <div className={styles.row5}><div className={styles.text5}>T2</div><div className={styles.text6}>Train · 4 min away<div className={styles.text7}>Newtown Station, Platform 1</div></div></div>
                  <div className={styles.row5}><div className={styles.text5}>5′</div><div className={styles.text6}>Walk · 350 m<div className={styles.text7}>Step-free route available</div></div></div>
                </div>
              </div>
            </div>
            <div className={styles.col6}>
              <div className={styles.heading2}>Similar events</div>
              <div className={styles.row6}>
                <div className={styles.box3}><div className={styles.text8}>Open-mic at The Yard</div><div className={styles.text9}>Tonight 19:30 · Free</div></div>
                <div className={styles.box3}><div className={styles.text8}>Garden working bee</div><div className={styles.text9}>Sun 9:00 · Wilson St</div></div>
                <div className={styles.box3}><div className={styles.text8}>Vinyl fair at the Hub</div><div className={styles.text9}>Next Sat 10:00 · $2</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row7}>
        <div className={styles.pill3} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row8}>
          <div className={styles.pill4} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill5} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill6} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill7} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row9}><div className={styles.text10}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
