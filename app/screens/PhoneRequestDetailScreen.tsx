import type { PhoneScreenProps } from '../types';
import RouteMap from '../../RouteMap';
import styles from './PhoneRequestDetailScreen.module.css';

/** 2p · App request detail · 390×844 phone screen, fluid via --pu. */
export default function PhoneRequestDetailScreen({ onNavigate, selectedId, requests, deleteRequest }: PhoneScreenProps) {
  const request = requests.find((r) => r.id === selectedId) ?? requests[0];
  const onDelete = () => {
    if (window.confirm(`Delete "${request.title}"? This removes it from the kiosk too.`)) {
      deleteRequest(request.id);
      onNavigate('requests');
    }
  };
  return (
    <div className={styles.screen} data-screen-label="App request detail">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>‹ Requests</div>
        <div className={styles.heading}>{request.category}</div>
        <div className={styles.heading2}>♡</div>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>{request.title}</div>
        <div className={styles.row2}>
          <div className={styles.avatar}>{request.author.charAt(0)}</div>
          <div className={styles.box}><div className={styles.text}>{request.author}</div><div className={styles.meta}>Newtown member · posted {request.postedAt}</div></div>
        </div>
        <div className={styles.row3}>
          <div className={styles.chip}>{request.whenLabel}</div>
          <div className={styles.chip}>{request.venue}</div>
          <div className={styles.chip}>{request.walkLabel}</div>
        </div>
        <div className={styles.text2}>{request.blurb}</div>
        {request.route && (
          <>
            <div className={styles.sectionTitle}>Getting there</div>
            <RouteMap stops={request.route} color="#0C4B5C" lineColor="#0C4B5C" endpointsOnly profile="foot" className={styles.routeMap} />
          </>
        )}
        <div className={styles.card}>
          <div className={styles.row4}><div className={styles.text3}>Going</div><div className={styles.meta2}>{request.slotsLabel}</div></div>
          <div className={styles.chip2}><div className={styles.box2}></div></div>
          <div className={styles.row5}>
            <div className={styles.avatar2}>A</div>
            <div className={styles.avatar2}>J</div>
            <div className={styles.avatar2}>T</div>
            <div className={styles.avatar2}>P</div>
            <div className={styles.avatar3}>+4</div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.heading3}>426</div>
          <div className={styles.box}><div className={styles.text4}>Bus from King St · 5 min away</div><div className={styles.meta3}>3 stops · get off at Australia St</div></div>
          <div className={styles.heading4}>→</div>
        </div>
        <div className={styles.meta4}>Joining shares your first name with {request.author} and the others going. Nothing else. <span onClick={onDelete} role="button" tabIndex={0} style={{ color: '#C2410C', fontWeight: 700, cursor: 'pointer' }}>Delete this request</span></div>
      </div>
      <div className={styles.row6}>
        <div className={styles.pill2}>Join · {request.slotsLabel}</div>
      </div>
    </div>
  );
}
