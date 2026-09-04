import type { PhoneScreenId, PhoneScreenProps } from './types';
import styles from './PhoneNav.module.css';

/** The 4 main categories, each with its theme colour. `match` lists the screens
 *  that belong to the category so the tab stays lit on sub-screens (detail, new…). */
const NAV: { id: PhoneScreenId; label: string; color: string; match: PhoneScreenId[] }[] = [
  { id: 'events', label: 'Events', color: '#F6B963', match: ['events', 'eventDetail', 'newEvent'] },
  { id: 'requests', label: 'Requests', color: '#8FDCF2', match: ['requests', 'requestDetail', 'newRequest'] },
  { id: 'transport', label: 'Transport', color: '#F49B94', match: ['transport', 'routeDetail'] },
  { id: 'map', label: 'Map', color: '#A8D8A0', match: ['map'] },
];

export default function PhoneNav({ screen, onNavigate }: { screen: PhoneScreenId } & PhoneScreenProps) {
  return (
    <nav className={styles.nav}>
      {NAV.map((item) => {
        const active = item.match.includes(screen);
        return (
          <div
            key={item.id}
            className={active ? `${styles.item} ${styles.active}` : styles.item}
            style={{ background: active ? item.color : 'transparent' }}
            onClick={() => onNavigate(item.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate(item.id)}
            role="button"
            tabIndex={0}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.dot} style={{ background: active ? '#fff' : item.color }} />
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
