import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FakeQr from './FakeQr';
import { PhoneApp } from './app';
import type { PhoneScreenId } from './app/types';
import styles from './PhoneHandoff.module.css';

/** Kiosk → phone handoff. The QR is the hub's pointer; activating it (a mid-fi
 *  stand-in for scanning) opens the matching phone page in a device overlay.
 *  Navigation lives in each phone screen's own top nav (Home / create).
 *  ponytail: click == scan until FakeQr becomes a real, camera-readable code. */
export default function PhoneHandoff({
  screen,
  selectedId,
  color,
  seed,
}: {
  screen: PhoneScreenId;
  selectedId?: string;
  color?: string;
  seed?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div
        className={styles.qr}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Scan to open this on your phone"
      >
        <FakeQr color={color} seed={seed} />
      </div>
      {open &&
        createPortal(
          <div className={styles.scrim} onClick={() => setOpen(false)}>
            <div className={styles.caption}>Scanned ✓ - now on your phone</div>
            <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
              <div className={`${styles.viewport} llPhoneFrame`}>
                <PhoneApp initialScreen={screen} initialSelectedId={selectedId} />
              </div>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
