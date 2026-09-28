import KioskShell from '../KioskShell';
import PhoneHandoff from '../PhoneHandoff';
import RouteMap from '../RouteMap';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { events } from '../data';
import styles from './EventDetailScreen.module.css';

/** 1e · Event detail - 1920×1080 kiosk screen, fluid via --u. */
export default function EventDetailScreen({ onNavigate, selectedId, largeText, onLargeText }: KioskScreenProps) {
  const event = events.find((e) => e.id === selectedId) ?? events[0];
  const similar = events.filter((e) => e.id !== event.id);
  return (
    <div className={styles.screen} data-screen-label="Event detail">
      <KioskShell active="eventDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}><div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>← All events</div><div className={styles.text}>Events · {event.title}</div></div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.mapPlaceholder} style={{ backgroundColor: event.tint, backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className={styles.title}>{event.title}</div>
            <div className={styles.row2}>
              <div className={styles.pill2}>{event.venue}</div>
              {event.tags.map((t) => (
                <div key={t} className={styles.pill2}>{t}</div>
              ))}
            </div>
            <div className={styles.text2}>{event.blurb}</div>
            <div className={styles.box}></div>
            <div className={styles.row3}>
              <div className={styles.box2}><PhoneHandoff screen="eventDetail" selectedId={event.id} color="#2B2723" seed={7} /></div>
              <div><div className={styles.text3}>Take it with you</div><div className={styles.text4}>Scan to save this event and get a reminder on your phone.</div></div>
            </div>
          </div>
          <div className={styles.col3}>
            <div className={styles.col4}>
              <div className={styles.heading}>Getting there</div>
              <div className={styles.row4}>
                {event.route
                  ? <RouteMap stops={event.route} color={event.tint} lineColor="#C2410C" endpointsOnly profile="foot" className={styles.mapPlaceholder2} />
                  : <div className={styles.mapPlaceholder2}>map · kiosk → venue</div>}
              </div>
            </div>
            <div className={styles.col6}>
              <div className={styles.heading2}>Similar events</div>
              <div className={styles.row6}>
                {similar.map((e) => (
                  <div
                    key={e.id}
                    className={styles.box3}
                    onClick={() => onNavigate('eventDetail', e.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.text8}>{e.title}</div>
                    <div className={styles.text9}>{e.whenLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row7}>
        <div className={styles.pill3} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row8}>
          <div className={styles.pill4} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill5} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill6} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill7} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
