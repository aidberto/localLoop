import type { PhoneScreenProps } from '../types';
import styles from './PhoneMapScreen.module.css';

/** 2l · App map · 390×844 phone screen, fluid via --pu. */
export default function PhoneMapScreen({ onNavigate }: PhoneScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="App map">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Map of Newtown</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.row2}>
        <div className={styles.chip}><div className={styles.avatar}></div>Events</div>
        <div className={styles.chip2}><div className={styles.avatar2}></div>Transport</div>
        <div className={styles.chip3}><div className={styles.avatar3}></div>Requests</div>
        <div className={styles.chip4}><div className={styles.avatar4}></div>Parks</div>
      </div>
      <div className={styles.mapPlaceholder}>
        <div className={styles.pin}>interactive map · pinch + drag</div>
        <div className={styles.pin2}><div className={styles.avatar5}></div><div className={styles.chip5}>You are here</div></div>
        <div className={styles.pin3}></div>
        <div className={styles.pin4}></div>
        <div className={styles.pin5}></div>
        <div className={styles.pin6}>
          <div className={styles.title}>+</div>
          <div className={styles.title}>−</div>
        </div>
      </div>
      <div className={styles.box2}>
        <div className={styles.card}>
          <div className={styles.avatar6}></div>
          <div className={styles.box3}><div className={styles.text}>Makers Market</div><div className={styles.meta}>Starts in 2 h 15 m · 350 m · Free</div></div>
          <div className={styles.heading2}>→</div>
        </div>
      </div>
    </div>
  );
}
