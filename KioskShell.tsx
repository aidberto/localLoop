import type { KioskShellProps } from './types';
import styles from './KioskShell.module.css';

/** Persistent kiosk header. Shared by every 1920x1080 screen. */
export default function KioskShell({
  onNavigate,
  suburb = 'Newtown',
  time = '12:00',
  temperature = '25°',
  showRegister = true,
}: KioskShellProps) {
  return (
    <header className={styles.shell}>
      <div
        className={styles.brand}
        role="button"
        tabIndex={0}
        onClick={() => onNavigate('home')}
      >
        <div className={styles.mark} />
        <div className={styles.wordmark}>LocalLoop</div>
      </div>
      <div className={styles.divider} />
      <div className={styles.suburb}>{suburb}</div>
      <div className={styles.spacer} />
      {showRegister && (
        <>
          <div className={styles.prompt}>Are you a {suburb} resident?</div>
          <button
            type="button"
            className={styles.register}
            onClick={() => onNavigate('register')}
          >
            Register
          </button>
        </>
      )}
      <div className={styles.divider} />
      <div className={styles.time}>{time}</div>
      <div className={styles.temp}>{temperature}</div>
    </header>
  );
}
