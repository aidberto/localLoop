import type { PhoneScreenProps } from '../types';
import RouteMap from '../../RouteMap';
import styles from './PhoneEventDetailScreen.module.css';

/** 2j · App event detail · 390×844 phone screen, fluid via --pu. */
export default function PhoneEventDetailScreen({ onNavigate, selectedId, events, deleteEvent }: PhoneScreenProps) {
  const event = events.find((e) => e.id === selectedId) ?? events[0];
  const onDelete = () => {
    if (window.confirm(`Delete "${event.title}"? This removes it from the kiosk too.`)) {
      deleteEvent(event.id);
      onNavigate('events');
    }
  };
  return (
    <div className={styles.screen} data-screen-label="App event detail">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>‹ Events</div>
        <div className={styles.heading}>{event.title}</div>
        <div className={styles.heading2}>♡</div>
      </div>
      <div className={styles.col}>
        <div className={styles.mapPlaceholder} style={{ backgroundColor: event.tint, backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className={styles.title}>{event.title}</div>
        <div className={styles.row2}>
          {event.tags.map((t) => (
            <div key={t} className={styles.chip}>{t}</div>
          ))}
          <div className={styles.chip}>{event.distanceM ? `${event.distanceM} m away` : 'Nearby'}</div>
        </div>
        <div className={styles.text}>{event.blurb}</div>
        <div className={styles.sectionTitle}>Getting there</div>
        {event.route && <RouteMap stops={event.route} color={event.tint} lineColor="#E4002B" endpointsOnly profile="foot" className={styles.routeMap} />}
        <div className={styles.card}>
          <div className={styles.heading3}>422</div>
          <div className={styles.box}><div className={styles.text2}>Bus from King St · 3 min away</div><div className={styles.meta}>2 stops · get off at Newtown Bridge</div></div>
          <div className={styles.heading4}>→</div>
        </div>
        <div className={styles.meta2}>Hosted by Newtown Makers Collective · <span onClick={onDelete} role="button" tabIndex={0} style={{ color: '#C2410C', fontWeight: 700, cursor: 'pointer' }}>Delete this event</span></div>
      </div>
      <div className={styles.row3}>
        <div className={styles.pill2}>Save to calendar</div>
        <div className={styles.pill3}>Directions</div>
      </div>
    </div>
  );
}
