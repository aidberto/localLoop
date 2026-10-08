import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { PhoneScreenProps } from '../types';
import { newId } from '../../data';
import styles from './PhoneNewEventScreen.module.css';

// Transparent field that keeps the surrounding card's typography (class sets size).
const field: CSSProperties = { background: 'transparent', border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', color: 'inherit' };

/** "2026-11-14T10:00" → "Sat 10:00". Empty/invalid → "Soon". */
function formatWhen(dt: string): string {
  if (!dt) return 'Soon';
  const d = new Date(dt);
  if (isNaN(d.getTime())) return 'Soon';
  return d.toLocaleString('en-AU', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');
}

/** 2k · App new event · 390×844 phone screen, fluid via --pu.
 *  Posting creates a real record via the board API so it shows on every screen. */
export default function PhoneNewEventScreen({ onNavigate, createEvent }: PhoneScreenProps) {
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState('Street library book swap');
  const [when, setWhen] = useState('');
  const [venue, setVenue] = useState('Camperdown Rest Park');
  const [free, setFree] = useState(true);
  const [blurb, setBlurb] = useState("Bring a book, take a book. Kids' picture books especially welcome.");

  const priceLabel = free ? 'Free' : 'Paid';
  const whenLabel = `${formatWhen(when)} · ${venue}${free ? ' · Free' : ''}`;

  const post = () => {
    const startsAt = when ? new Date(when).getTime() : 0;
    createEvent({
      id: newId('evt'),
      title: title.trim() || 'Untitled event',
      whenLabel,
      dueInMin: startsAt ? Math.max(0, Math.round((startsAt - Date.now()) / 60000)) : 60,
      venue: venue.trim(),
      distanceM: 0,                 // unknown without geocoding - list shows "Nearby"
      tint: '#F6B963',              // default photo placeholder colour
      image: '',                    // no upload in the prototype
      tags: free ? ['Free'] : [],
      blurb: blurb.trim(),
    });
    onNavigate('events');
  };

  if (preview) {
    return (
      <div className={styles.screen} data-screen-label="App new event · preview">
        <div className={styles.row}>
          <div className={styles.pill} onClick={() => setPreview(false)} role="button" tabIndex={0}>‹ Edit</div>
          <div className={styles.heading}>Preview</div>
          <div className={styles.box}></div>
        </div>
        <div className={styles.col}>
          <div className={styles.col2}><div className={styles.heading2}>{title}</div></div>
          <div className={styles.col2}><div className={styles.text}>When</div><div className={styles.heading3}>{formatWhen(when)}</div></div>
          <div className={styles.col2}><div className={styles.text}>Where</div><div className={styles.heading3}>{venue} · {priceLabel}</div></div>
          <div className={styles.col2}><div className={styles.text}>Description</div><div className={styles.text2}>{blurb}</div></div>
          <div className={styles.meta2}>This is how neighbours will see it on the Newtown kiosk and in the app.</div>
        </div>
        <div className={styles.col3}>
          <div className={styles.approval}><span className={styles.approvalBadge}>✓</span>Events are approved by the council board before they go live.</div>
          <div className={styles.pill4} onClick={post} role="button" tabIndex={0}>Post event</div>
          <div className={styles.meta3}>Edit or delete it anytime after posting.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen} data-screen-label="App new event">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('events')} role="button" tabIndex={0}>‹ Events</div>
        <div className={styles.heading}>New event</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.col2}><div className={styles.text}>Event name</div>
          <input className={styles.heading2} style={field} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>Date &amp; time</div>
          <input type="datetime-local" className={styles.heading3} style={field} value={when} onChange={(e) => setWhen(e.target.value)} />
          <div className={styles.meta}>Picked from a calendar, no typing, no typos.</div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Location</div>
          <input className={styles.heading3} style={field} value={venue} onChange={(e) => setVenue(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>Photo</div>
          <div className={styles.upload} role="button" tabIndex={0}><span className={styles.uploadIcon}>🖼</span><span className={styles.uploadText}>Add a photo</span><span className={styles.meta}>Take one now or choose from your library</span></div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Price</div>
          <div className={styles.row2}>
            <div className={free ? styles.pill2 : styles.pill3} onClick={() => setFree(true)} role="button" tabIndex={0}>Free</div>
            <div className={free ? styles.pill3 : styles.pill2} onClick={() => setFree(false)} role="button" tabIndex={0}>Paid…</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Description <span className={styles.box2}>(one short paragraph)</span></div>
          <textarea className={styles.text2} style={{ ...field, resize: 'none' }} rows={3} value={blurb} onChange={(e) => setBlurb(e.target.value)} />
        </div>
        <div className={styles.meta2}>Events appear on the public Newtown kiosk. Keep it local and family-friendly. See posting guidelines.</div>
      </div>
      <div className={styles.col3}>
        <div className={styles.approval}><span className={styles.approvalBadge}>✓</span>Events are approved by the council board before they go live.</div>
        <div className={styles.pill4} onClick={() => setPreview(true)} role="button" tabIndex={0}>Preview event</div>
        <div className={styles.meta3}>You'll see it exactly as others will before it goes live. Edit or delete anytime.</div>
      </div>
    </div>
  );
}
