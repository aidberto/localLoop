import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { PhoneScreenProps } from '../types';
import { bbqRequest, newId } from '../../data';
import styles from './PhoneNewRequestScreen.module.css';

// Chip label → stored category code (matches the kiosk filter pills).
const CATEGORIES = [
  { label: 'Food', cat: 'FOOD' },
  { label: 'Sport & fitness', cat: 'SPORT' },
  { label: 'Garden', cat: 'GARDEN' },
  { label: 'Music', cat: 'MUSIC' },
];

// Transparent field that keeps the surrounding card's typography (class sets size).
const field: CSSProperties = { background: 'transparent', border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', color: 'inherit' };

/** "2026-11-14T12:00" → "Sat 12:00". Empty/invalid → "Soon". */
function formatWhen(dt: string): string {
  if (!dt) return 'Soon';
  const d = new Date(dt);
  if (isNaN(d.getTime())) return 'Soon';
  return d.toLocaleString('en-AU', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');
}

/** 2q · App new request · 390×844 phone screen, fluid via --pu.
 *  Pre-filled with the outdoor-BBQ draft (kiosk→phone handoff demo). Posting
 *  creates a real record via the board API so it shows on every screen. */
export default function PhoneNewRequestScreen({ onNavigate, createRequest }: PhoneScreenProps) {
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(bbqRequest.title);
  const [cat, setCat] = useState(bbqRequest.category);
  const [when, setWhen] = useState('');            // datetime-local; empty shows BBQ default label
  const [venue, setVenue] = useState(bbqRequest.venue);
  const [slots, setSlots] = useState(0);           // 0 = "Open to all"
  const [blurb, setBlurb] = useState(bbqRequest.blurb);
  const [author, setAuthor] = useState(bbqRequest.author);

  const slotsLabel = slots <= 0 ? 'Open to all' : `${slots} slot${slots === 1 ? '' : 's'} left`;
  const whenLabel = when ? formatWhen(when) : bbqRequest.whenLabel;

  const post = () => {
    createRequest({
      id: newId('req'),
      category: cat,
      author: author.trim() || 'You',
      postedAt: 'just now',
      title: title.trim() || 'Untitled request',
      blurb: blurb.trim(),
      slotsLabel,
      whenLabel,
      venue: venue.trim(),
      walkLabel: 'Newtown · step-free',
    });
    onNavigate('requests');
  };

  if (preview) {
    return (
      <div className={styles.screen} data-screen-label="App new request · preview">
        <div className={styles.row}>
          <div className={styles.pill} onClick={() => setPreview(false)} role="button" tabIndex={0}>‹ Edit</div>
          <div className={styles.heading}>Preview</div>
          <div className={styles.box}></div>
        </div>
        <div className={styles.col}>
          <div className={styles.previewCard}>
            <div className={styles.row2}><div className={styles.chip}>{cat}</div></div>
            <div className={styles.heading2b}>{title}</div>
            <div className={styles.previewMeta}>{author} · {whenLabel} · {venue}</div>
            <div className={styles.previewBlurb}>{blurb}</div>
            <div className={styles.row2}><div className={styles.chip2}>{slotsLabel}</div></div>
          </div>
          <div className={styles.meta}>This is exactly how neighbours will see it on the Newtown kiosk and in the app.</div>
        </div>
        <div className={styles.col3}>
          <div className={styles.pill2} onClick={post} role="button" tabIndex={0}>Post it</div>
          <div className={styles.meta2}>You can edit or delete it anytime after posting.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen} data-screen-label="App new request">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>‹ Requests</div>
        <div className={styles.heading}>New request</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.col}>
        <div className={styles.col2}><div className={styles.text}>What are you after?</div>
          <input className={styles.heading2} style={field} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>Category</div>
          <div className={styles.row2}>
            {CATEGORIES.map((c) => (
              <div key={c.cat} className={cat === c.cat ? styles.chip : styles.chip2} onClick={() => setCat(c.cat)} role="button" tabIndex={0}>{c.label}</div>
            ))}
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Date &amp; time</div>
          <input type="datetime-local" className={styles.heading3} style={field} value={when} onChange={(e) => setWhen(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>Where</div>
          <input className={styles.heading3} style={field} value={venue} onChange={(e) => setVenue(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>Your first name</div>
          <input className={styles.heading3} style={field} value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className={styles.col2}><div className={styles.text}>How many people can come?</div>
          <div className={styles.row3}>
            <div className={styles.heading6} onClick={() => setSlots((s) => Math.max(0, s - 1))} role="button" tabIndex={0}>−</div>
            <div className={styles.heading7}>{slotsLabel}</div>
            <div className={styles.heading8} onClick={() => setSlots((s) => s + 1)} role="button" tabIndex={0}>＋</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Anything else? <span className={styles.box2}>(optional)</span></div>
          <textarea className={styles.text2b} style={{ ...field, resize: 'none' }} rows={3} value={blurb} onChange={(e) => setBlurb(e.target.value)} />
        </div>
        <div className={styles.meta}>Requests show on the public Newtown kiosk with your first name only. They close automatically once the spots fill.</div>
      </div>
      <div className={styles.col3}>
        <div className={styles.pill2} onClick={() => setPreview(true)} role="button" tabIndex={0}>Preview request</div>
        <div className={styles.meta2}>You'll see it exactly as others will before it goes live. Edit or delete anytime.</div>
      </div>
    </div>
  );
}
