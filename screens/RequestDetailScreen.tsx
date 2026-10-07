import KioskShell from '../KioskShell';
import PhoneHandoff from '../PhoneHandoff';
import RouteMap from '../RouteMap';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { requests } from '../data';
import styles from './RequestDetailScreen.module.css';

/** 1i · Request detail - 1920×1080 kiosk screen, fluid via --u. */
export default function RequestDetailScreen({ onNavigate, selectedId, largeText, onLargeText }: KioskScreenProps) {
  const request = requests.find((r) => r.id === selectedId) ?? requests[0];
  const more = requests.filter((r) => r.id !== request.id).slice(0, 2);
  return (
    <div className={styles.screen} data-screen-label="Request detail">
      <KioskShell active="requestDetail" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}><div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>← Back to the board</div><div className={styles.text}>Requests · {request.title}</div></div>
        <div className={styles.grid}>
          <div className={styles.col2}>
            <div className={styles.row2}><div className={styles.pill2}>{request.category}</div><div className={styles.text2}>{request.author} · posted {request.postedAt}</div></div>
            <div className={styles.title}>{request.title}</div>
            <div className={styles.row3}>
              <div className={styles.pill3}>{request.slotsLabel}</div>
              <div className={styles.pill3}>{request.whenLabel}</div>
              <div className={styles.pill3}>{request.venue}</div>
            </div>
            <div className={styles.text3}>{request.blurb}</div>
            <div className={styles.box}></div>
            <div className={styles.row4}>
              <div className={styles.box2}><PhoneHandoff screen="requestDetail" selectedId={request.id} color="#0C4B5C" /></div>
              <div><div className={styles.heading}>Want in?</div><div className={styles.text4}>Scan the code and register for "{request.title}" in the LocalLoop app - the kiosk never asks for your details.</div></div>
            </div>
          </div>
          <div className={styles.col3}>
            <div className={styles.row5}>
              {request.route
                ? <RouteMap stops={request.route} color="#0C4B5C" lineColor="#0C4B5C" endpointsOnly profile="foot" className={styles.mapPlaceholder} />
                : <div className={styles.mapPlaceholder}>map · kiosk → {request.venue}</div>}
              <div className={styles.pin}>{request.walkLabel}</div>
            </div>
            <div className={styles.col4}>
              <div className={styles.heading2}>More from the board</div>
              <div className={styles.row6}>
                {more.map((r) => (
                  <div
                    key={r.id}
                    className={styles.box3}
                    onClick={() => onNavigate('requestDetail', r.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.text5}>{r.title}</div>
                    <div className={styles.text6}>{r.author} · {r.whenLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row7}>
        <div className={styles.pill4} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row8}>
          <div className={styles.pill5} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill6} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill7} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill8} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
