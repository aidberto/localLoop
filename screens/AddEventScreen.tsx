import PhoneHandoff from '../PhoneHandoff';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import styles from './AddEventScreen.module.css';

/** 1l · Host an event - the kiosk is touch-only (no keyboard), so typing the
 *  event happens on the organiser's own phone. Scanning hands off to the app's
 *  new-event flow (2k); the kiosk just explains it and shows the code. */
export default function AddEventScreen({ onNavigate, largeText, onLargeText }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Host an event">
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div>
            <div className={styles.title}>Host an event in Newtown</div>
            <div className={styles.text}>Adding an event happens on your own phone</div>
          </div>
          <div className={styles.box2}></div>
          <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>← Events</div>
        </div>
        <div className={styles.row2}>
          <div className={styles.card}>
            <div className={styles.heading}>How it works</div>
            <div className={styles.row3}>
              <div className={styles.avatar}>1</div>
              <div className={styles.box2}><div className={styles.heading2}>Scan the code with your phone camera</div><div className={styles.text2}>The LocalLoop app opens straight to a new Newtown event. Don't have the app yet? The code takes you to the store first.</div></div>
            </div>
            <div className={styles.row3}>
              <div className={styles.avatar}>2</div>
              <div className={styles.box2}><div className={styles.heading2}>Fill in the details on your phone</div><div className={styles.text2}>Name, date &amp; time, location and a short description - plus any photos. Typing on your own phone means no typos and nothing left on the shared screen.</div></div>
            </div>
            <div className={styles.row3}>
              <div className={styles.avatar}>3</div>
              <div className={styles.box2}><div className={styles.heading2}>Preview, then publish</div><div className={styles.text2}>Your event goes live on the public Newtown kiosk and in the app. Edit or delete it anytime from your phone.</div></div>
            </div>
            <div className={styles.box2}></div>
            <div className={styles.card2}>Events should be local and family-friendly. See the posting guidelines before you publish.</div>
          </div>
          <div className={styles.card3}>
            <div className={styles.heading3}>Scan to start</div>
            <div className={styles.card4}>
              <PhoneHandoff screen="newEvent" color="#6E4708" />
            </div>
            <div className={styles.box4}><div className={styles.heading4}>Kiosk NW-04 · King St library</div><div className={styles.text3}>Or type localloop.au/host in your browser</div></div>
          </div>
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill2} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row5}>
          <div className={styles.pill3} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Events</div>
          <div className={styles.pill4} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Map</div>
          <div className={styles.pill5} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar5}></div>Transport</div>
          <div className={styles.pill6} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
