import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import styles from './RequestsScreen.module.css';

/** 1h · Requests - 1920×1080 kiosk screen, fluid via --u. */
export default function RequestsScreen({ onNavigate }: KioskScreenProps) {
  return (
    <div className={styles.screen} data-screen-label="Requests">
      <KioskShell active="requests" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}>
          <div className={styles.box}></div>
          <div className={styles.title}>Newtown's board</div>
          <div className={styles.text}>Neighbours looking for people to join in</div>
          <div className={styles.box2}></div>
          <div className={styles.pill}>Post via the app</div>
        </div>
        <div className={styles.row2}>
          <div className={styles.pill2}>All · 6</div>
          <div className={styles.pill3}>Sport &amp; fitness</div>
          <div className={styles.pill3}>Music</div>
          <div className={styles.pill3}>Garden</div>
          <div className={styles.pill3}>Games</div>
          <div className={styles.pill3}>Food</div>
          <div className={styles.pill3}>Open spots only</div>
          <div className={styles.box2}></div>
          <div className={styles.pill4}>Sort · Newest ↓</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card} onClick={() => onNavigate('requestDetail')} role="button" tabIndex={0}>
            <div className={styles.row3}><div className={styles.chip}>SPORT</div><div className={styles.text2}>Tien · 2 h ago</div></div>
            <div className={styles.heading}>Two more for Saturday basketball?</div>
            <div className={styles.text3}>Friendly half-court game, all skill levels welcome. Spare ball and bibs provided.</div>
            <div className={styles.row3}><div className={styles.text4}>2 slots left</div><div className={styles.text5}>Sat 9:00</div></div>
          </div>
          <div className={styles.card}>
            <div className={styles.row3}><div className={styles.chip}>RUN</div><div className={styles.text2}>Josh · 5 h ago</div></div>
            <div className={styles.heading}>Slow Sunday run crew, 5 km</div>
            <div className={styles.text3}>Easy pace along the Cooks River path, coffee after. Walkers welcome too.</div>
            <div className={styles.row3}><div className={styles.text4}>Open to all</div><div className={styles.text5}>Sun 7:30</div></div>
          </div>
          <div className={styles.card}>
            <div className={styles.row3}><div className={styles.chip}>MUSIC</div><div className={styles.text2}>Peter · yesterday</div></div>
            <div className={styles.heading}>Drummer wanted for garage jam</div>
            <div className={styles.text3}>Indie covers, Thursday evenings near the station. Kit provided, bring sticks.</div>
            <div className={styles.row3}><div className={styles.text4}>1 slot left</div><div className={styles.text5}>Thu 18:30</div></div>
          </div>
          <div className={styles.card}>
            <div className={styles.row3}><div className={styles.chip}>GARDEN</div><div className={styles.text2}>Aiden · yesterday</div></div>
            <div className={styles.heading}>Hands to move mulch on Sunday</div>
            <div className={styles.text3}>One trailer load into the Wilson St beds. An hour of your morning, tea and scones after.</div>
            <div className={styles.row3}><div className={styles.text4}>4 slots left</div><div className={styles.text5}>Sun 10:00</div></div>
          </div>
          <div className={styles.card}>
            <div className={styles.row3}><div className={styles.chip}>GAMES</div><div className={styles.text2}>Jacob · 2 days ago</div></div>
            <div className={styles.heading}>Chess in Camperdown park</div>
            <div className={styles.text3}>Boards set up near the big fig every Saturday afternoon. All ages, all levels.</div>
            <div className={styles.row3}><div className={styles.text4}>Drop in</div><div className={styles.text5}>Sat 14:00</div></div>
          </div>
          <div className={styles.card}>
            <div className={styles.row3}><div className={styles.chip}>FOOD</div><div className={styles.text2}>Hana · 3 days ago</div></div>
            <div className={styles.heading}>Community dinner cook-up</div>
            <div className={styles.text3}>Cooking a big batch for the neighbourhood centre. Choppers and stirrers needed.</div>
            <div className={styles.row3}><div className={styles.text4}>3 slots left</div><div className={styles.text5}>Fri 17:00</div></div>
          </div>
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.pill5} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box2}></div>
        <div className={styles.row5}>
          <div className={styles.pill6} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill7} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill8} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill9} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box2}></div>
        <div className={styles.row2}><div className={styles.text6}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
