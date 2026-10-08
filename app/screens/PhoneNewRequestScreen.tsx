import { useState } from 'react';
import type { PhoneScreenProps } from '../types';
import { bbqRequest } from '../../data';
import styles from './PhoneNewRequestScreen.module.css';

/** 2q · App new request · 390×844 phone screen, fluid via --pu.
 *  Pre-filled with the canned outdoor-BBQ request for the kiosk→phone handoff demo. */
export default function PhoneNewRequestScreen({ onNavigate, onPublish }: PhoneScreenProps) {
  const [preview, setPreview] = useState(false);

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
            <div className={styles.row2}><div className={styles.chip}>{bbqRequest.category}</div></div>
            <div className={styles.heading2b}>{bbqRequest.title}</div>
            <div className={styles.previewMeta}>{bbqRequest.author} · {bbqRequest.whenLabel} · {bbqRequest.venue}</div>
            <div className={styles.previewBlurb}>{bbqRequest.blurb}</div>
            <div className={styles.row2}><div className={styles.chip2}>{bbqRequest.slotsLabel}</div><div className={styles.chip2}>{bbqRequest.walkLabel}</div></div>
          </div>
          <div className={styles.meta}>This is exactly how neighbours will see it on the Newtown kiosk and in the app.</div>
        </div>
        <div className={styles.col3}>
          <div className={styles.pill2} onClick={() => { onPublish?.(); onNavigate('requests'); }} role="button" tabIndex={0}>Post it</div>
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
        <div className={styles.col2}><div className={styles.text}>What are you after?</div><div className={styles.heading2} contentEditable suppressContentEditableWarning>{bbqRequest.title}</div></div>
        <div className={styles.col2}><div className={styles.text}>Category</div>
          <div className={styles.row2}>
            <div className={styles.chip}>Food</div>
            <div className={styles.chip2}>Sport &amp; fitness</div>
            <div className={styles.chip2}>Garden</div>
            <div className={styles.chip2}>Music</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Date &amp; time</div><div className={styles.heading3}>Sat 12 Oct · 12:00<span className={styles.heading4}>🗓</span></div></div>
        <div className={styles.col2}><div className={styles.text}>Where</div><div className={styles.heading3}>{bbqRequest.venue}<span className={styles.heading5}>📍</span></div></div>
        <div className={styles.col2}><div className={styles.text}>How many people can come?</div>
          <div className={styles.row3}>
            <div className={styles.heading6}>−</div>
            <div className={styles.heading7}>Open to all</div>
            <div className={styles.heading8}>＋</div>
          </div>
        </div>
        <div className={styles.col2}><div className={styles.text}>Anything else? <span className={styles.box2}>(optional)</span></div><div className={styles.text2b} contentEditable suppressContentEditableWarning>{bbqRequest.blurb}</div></div>
        <div className={styles.meta}>Requests show on the public Newtown kiosk with your first name only. They close automatically once the spots fill.</div>
      </div>
      <div className={styles.col3}>
        <div className={styles.pill2} onClick={() => setPreview(true)} role="button" tabIndex={0}>Preview request</div>
        <div className={styles.meta2}>You'll see it exactly as others will before it goes live. Edit or delete anytime.</div>
      </div>
    </div>
  );
}
