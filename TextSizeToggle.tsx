import styles from './TextSizeToggle.module.css';

interface TextSizeToggleProps {
  largeText?: boolean;
  onLargeText?: (value: boolean) => void;
}

/** Shared bottom-bar accessibility control. State is global (owned by KioskApp),
 *  so it reflects and toggles large-text mode identically on every screen. */
export default function TextSizeToggle({ largeText = false, onLargeText }: TextSizeToggleProps) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>Text size</div>
      <div
        className={`${styles.a} ${styles.aSm}${largeText ? '' : ` ${styles.sel}`}`}
        onClick={() => onLargeText?.(false)}
        role="button"
        tabIndex={0}
      >
        A
      </div>
      <div
        className={`${styles.a} ${styles.aLg}${largeText ? ` ${styles.sel}` : ''}`}
        onClick={() => onLargeText?.(true)}
        role="button"
        tabIndex={0}
      >
        A
      </div>
    </div>
  );
}
