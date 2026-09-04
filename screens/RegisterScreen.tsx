import { useEffect, useState, type ReactNode } from 'react';
import PhoneHandoff from '../PhoneHandoff';
import type { KioskScreenProps } from '../types';
import styles from './RegisterScreen.module.css';

export interface RegisterScreenProps extends KioskScreenProps {
  /** Kiosk identifier shown under the code. */
  kioskId?: string;
  /** Typed fallback URL, matching the QR target. */
  signupUrl?: string;
  /** Seconds on the code-refresh countdown; starts when the screen opens. */
  refreshSeconds?: number;
  /** Real QR code element. Replaces the handoff QR when provided. */
  qrCode?: ReactNode;
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/** 1k · Register QR - scanning it hands off to the app's registry flow (2c). */
export default function RegisterScreen({
  onNavigate,
  kioskId = 'Kiosk NW-04 · King St library',
  signupUrl = 'localloop.au/nw04',
  refreshSeconds = 300,
  qrCode,
}: RegisterScreenProps) {
  const [left, setLeft] = useState(refreshSeconds);
  useEffect(() => {
    setLeft(refreshSeconds);
    const id = setInterval(() => setLeft((s) => (s <= 0 ? refreshSeconds : s - 1)), 1000);
    return () => clearInterval(id);
  }, [refreshSeconds]);

  return (
    <div className={styles.screen} data-screen-label="Register QR">

      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Join LocalLoop Newtown</div>
          <div className={styles.text}>Registering happens on your own phone</div>
          <div className={styles.box2}></div>
          <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>← Home</div>
        </div>
        <div className={styles.row2}>
          <div className={styles.card}>
            <div className={styles.heading}>How it works</div>
            <div className={styles.row3}>
              <div className={styles.avatar}>1</div>
              <div className={styles.box2}><div className={styles.heading2}>Scan the code with your phone camera</div><div className={styles.text2}>The LocalLoop app opens straight to the Newtown sign-up. Don't have the app yet? The code takes you to the store first.</div></div>
            </div>
            <div className={styles.row3}>
              <div className={styles.avatar}>2</div>
              <div className={styles.box2}><div className={styles.heading2}>Add your details on your phone</div><div className={styles.text2}>Name, mobile and your Newtown street - used once to confirm you live here, then hidden from other members.</div></div>
            </div>
            <div className={styles.row3}>
              <div className={styles.avatar}>3</div>
              <div className={styles.box2}><div className={styles.heading2}>We text you within 2 business days</div><div className={styles.text2}>Until then you can still browse events, transport and the board - posting and messaging unlock once you're approved.</div></div>
            </div>
            <div className={styles.box2}></div>
            <div className={styles.card2}>No phone with you? Ask at the library desk and a staff member can register you on paper.</div>
          </div>
          <div className={styles.card3}>
            <div className={styles.heading3}>Scan to start</div>
            <div className={styles.card4}>
              {qrCode ?? <PhoneHandoff screen="newMember" color="#2B2723" seed={11} />}
            </div>
            <div className={styles.box4}><div className={styles.heading4}>{kioskId}</div><div className={styles.text3}>Or type {signupUrl} in your browser</div></div>
            <div className={styles.chip}><div className={styles.avatar2}></div><div className={styles.text4}>Code refreshes in {mmss(left)}</div></div>
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
        <div className={styles.row6}><div className={styles.text5}>Text size</div><div className={styles.avatar7}>A</div><div className={styles.avatar8}>A</div></div>
      </div>
    </div>
  );
}
