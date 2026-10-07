import { QRCodeSVG } from 'qrcode.react';
import type { PhoneScreenId } from './app/types';
import styles from './PhoneHandoff.module.css';

/** Kiosk → phone handoff. Renders a real, camera-scannable QR that deep-links to
 *  this deployment's phone view: `/?phone=<screen>&id=<selectedId>`. Scanning it
 *  opens the matching page in the visitor's own phone browser (see main.tsx). */
export default function PhoneHandoff({
  screen,
  selectedId,
  color = '#2B2723',
}: {
  screen: PhoneScreenId;
  selectedId?: string;
  color?: string;
}) {
  const params = new URLSearchParams({ phone: screen });
  if (selectedId) params.set('id', selectedId);
  const url = `${window.location.origin}/?${params}`;

  return (
    <div className={styles.qr}>
      <QRCodeSVG
        value={url}
        fgColor={color}
        bgColor="transparent"
        level="M"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Scan to open this on your phone"
      />
    </div>
  );
}
