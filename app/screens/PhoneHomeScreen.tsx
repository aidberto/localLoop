import type { PhoneScreenProps } from '../types';
import { events, requests, suburb } from '../../data';
import styles from './PhoneHomeScreen.module.css';

/** 2e · App home · 390×844 phone screen, fluid via --pu.
 *  Deliberately unlike the kiosk: personal greeting + a "you're going" hero and
 *  a scrollable feed, rather than the kiosk's public 2×2 dashboard grid. */
export default function PhoneHomeScreen({ onNavigate }: PhoneScreenProps) {
  const upNext = requests[0];
  const feedEvents = events.slice(0, 2);
  const feedRequests = requests.slice(1, 3);
  return (
    <div className={styles.screen} data-screen-label="App home">
      <div className={styles.header}>
        <div className={styles.avatar}>S</div>
        <div className={styles.hgroup}>
          <div className={styles.hello}>Good afternoon, Sam</div>
          <div className={styles.place}>📍 {suburb}</div>
        </div>
      </div>

      <div className={styles.body}>
        <div
          className={styles.upNext}
          onClick={() => onNavigate('requestDetail', upNext.id)}
          role="button"
          tabIndex={0}
        >
          <div className={styles.upTag}>UP NEXT · YOU'RE GOING</div>
          <div className={styles.upTitle}>{upNext.title}</div>
          <div className={styles.upMeta}>{upNext.whenLabel} · {upNext.venue}</div>
          <div className={styles.upFoot}>
            <div className={styles.upChip}>{upNext.walkLabel}</div>
            <div className={styles.upGo}>View →</div>
          </div>
        </div>

        <div className={styles.feedHead}>
          <div className={styles.feedTitle}>Happening near you</div>
          <div className={styles.feedMore} onClick={() => onNavigate('events')} role="button" tabIndex={0}>See all</div>
        </div>

        <div className={styles.feed}>
          {feedEvents.map((e) => (
            <div
              key={e.id}
              className={styles.eventCard}
              onClick={() => onNavigate('eventDetail', e.id)}
              role="button"
              tabIndex={0}
            >
              <div
                className={styles.eventThumb}
                style={{ backgroundColor: e.tint, backgroundImage: `url(${e.image})` }}
              />
              <div className={styles.cardBody}>
                <div className={styles.kindEvent}>EVENT</div>
                <div className={styles.cardTitle}>{e.title}</div>
                <div className={styles.cardMeta}>{e.distanceM} m · {e.tags.join(' · ')}</div>
              </div>
            </div>
          ))}
          {feedRequests.map((r) => (
            <div
              key={r.id}
              className={styles.reqCard}
              onClick={() => onNavigate('requestDetail', r.id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.reqAvatar}>{r.author.charAt(0)}</div>
              <div className={styles.cardBody}>
                <div className={styles.kindReq}>REQUEST · {r.category}</div>
                <div className={styles.cardTitle}>{r.title}</div>
                <div className={styles.cardMeta}>{r.author} · {r.whenLabel} · {r.slotsLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
