import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import styles from './MapScreen.module.css';

/** 1j · Map - 1920×1080 kiosk screen, fluid via --u. */
export default function MapScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Map">
      <KioskShell active="map" onNavigate={onNavigate} />
      <div className={styles.row}>
        <div className={styles.mapPlaceholder}>interactive map of Newtown · pinch + drag</div>
        <div className={styles.pin}>
          <div className={styles.text}>Show on map</div>
          <div className={styles.pill}><div className={styles.avatar}></div>Events · 3</div>
          <div className={styles.pill2}><div className={styles.avatar2}></div>Transport stops</div>
          <div className={styles.pill3}><div className={styles.avatar3}></div>Requests · 6</div>
          <div className={styles.pill4}><div className={styles.avatar4}></div>Parks &amp; toilets</div>
        </div>
        <div className={styles.pin2}>
          <div className={styles.card}>+</div>
          <div className={styles.card}>−</div>
        </div>
        <div className={styles.pin3}>
          <div className={styles.avatar5}></div>
          <div className={styles.pill5}>You are here</div>
        </div>
        <div className={styles.pin4}>
          <div className={styles.pill6}>Nearby now</div>
          <div className={styles.pill7}>Food &amp; drink</div>
          <div className={styles.pill7}>Step-free routes</div>
          <div className={styles.pill7}>Quiet places</div>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.pill8} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row3}>
          <div className={styles.pill9} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Events</div>
          <div className={styles.pill10} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Map</div>
          <div className={styles.pill11} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar8}></div>Transport</div>
          <div className={styles.pill12} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar9}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row4}><div className={styles.text2}>Text size</div><div className={styles.avatar10}>A</div><div className={styles.avatar11}>A</div></div>
      </div>
    </div>
  );
}
