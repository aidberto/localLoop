import type { KioskShellProps } from './types';
import { useClock, useWeather } from './data';
import styles from './KioskShell.module.css';

const clock = (ms: number) =>
  new Date(ms).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false });

/** Persistent kiosk header. Shared by every 1920x1080 screen.
 *  Time and weather are live for Newtown; props override for static mocks. */
export default function KioskShell({
  onNavigate,
  suburb = 'Newtown',
  time,
  temperature,
  showRegister = true,
}: KioskShellProps) {
  const { now } = useClock();
  const weather = useWeather();
  const timeLabel = time ?? clock(now);
  const tempLabel = temperature ?? (weather ? `${weather.tempC}°` : '-°');
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
      <div className={styles.time}>{timeLabel}</div>
      <div className={styles.temp}>
        {weather && !temperature && <span className={styles.weatherIcon}>{weather.icon}</span>}
        {tempLabel}
      </div>
    </header>
  );
}
