import type { PhoneScreenProps } from '../types';
import RouteMap from '../../RouteMap';
import { events } from '../../data';
import styles from './PhoneEventDetailScreen.module.css';

/** 2j · App event detail · 390×844 phone screen, fluid via --pu. */
export default function PhoneEventDetailScreen({ onNavigate }: PhoneScreenProps) {
  const event = events.find((e) => e.id === 'makers-market') ?? events[0];
  return (
    <div className={styles.screen} data-screen-label="App event detail">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>‹ Events</div>
        <div className={styles.heading}>Makers Market</div>
        <div className={styles.heading2}>♡</div>
      </div>
      <div className={styles.col}>
        <div className={styles.mapPlaceholder}>event photo</div>
        <div className={styles.title}>Makers Market</div>
        <div className={styles.row2}>
          <div className={styles.chip}>Sat 12:00 – 17:00</div>
          <div className={styles.chip}>350 m away</div>
          <div className={styles.chip}>Free entry</div>
        </div>
        <div className={styles.text}>Forty local stalls of ceramics, prints, plants and street food. Live acoustic sets from 2 pm, and a kids' craft corner run by the Newtown library. Dogs on leads welcome.</div>
        <div className={styles.sectionTitle}>Getting there</div>
        {event.route && <RouteMap stops={event.route} color={event.tint} lineColor="#E4002B" endpointsOnly profile="foot" className={styles.routeMap} />}
        <div className={styles.card}>
          <div className={styles.heading3}>422</div>
          <div className={styles.box}><div className={styles.text2}>Bus from King St · 3 min away</div><div className={styles.meta}>2 stops · get off at Newtown Bridge</div></div>
          <div className={styles.heading4}>→</div>
        </div>
        <div className={styles.meta2}>Hosted by Newtown Makers Collective · Report this listing</div>
      </div>
      <div className={styles.row3}>
        <div className={styles.pill2}>Save to calendar</div>
        <div className={styles.pill3}>Directions</div>
      </div>
    </div>
  );
}
