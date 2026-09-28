import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import KioskShell from '../KioskShell';
import type { KioskScreenProps } from '../types';
import { fetchDepartures, mapCenter, mapPoints, modeColors, useClock, type Departure, type MapKind } from '../data';
import styles from './HomeScreen.module.css';

const COLORS: Record<MapKind, string> = {
  event: '#F6B963',
  stop: '#F49B94',
  request: '#8FDCF2',
  park: '#C9E67E',
};

/** 1b · Home - 1920×1080 kiosk screen, fluid via --u. */
export default function HomeScreen({ onNavigate }: KioskScreenProps) {
  const mapEl = useRef<HTMLDivElement>(null);
  const { now } = useClock();
  const [departures, setDepartures] = useState<Departure[]>([]);

  // Live departures from the same TfNSW feed as the transport screen.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const data = await fetchDepartures();
      if (alive && data) setDepartures(data);
    };
    load();
    const id = setInterval(load, 30000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const soonest = [...departures]
    .filter((d) => d.dueAt != null)
    .sort((a, b) => (a.dueAt ?? 0) - (b.dueAt ?? 0))
    .slice(0, 3)
    .map((d) => ({ ...d, min: Math.max(0, Math.ceil((d.dueAt! - now) / 60000)) }));

  // Non-interactive preview: same tiles + dots as the full Map, no controls.
  useEffect(() => {
    if (!mapEl.current) return;
    const map = L.map(mapEl.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView([mapCenter.lat, mapCenter.lng], mapCenter.zoom + 1);
    L.tileLayer(
      `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`,
      { maxZoom: 19 },
    ).addTo(map);
    L.circleMarker([mapCenter.lat, mapCenter.lng], {
      radius: 6, color: '#FFFFFF', weight: 2, fillColor: '#2B2723', fillOpacity: 1,
    }).addTo(map);
    for (const p of mapPoints) {
      L.circleMarker([p.lat, p.lng], {
        radius: 5, color: '#FFFFFF', weight: 2, fillColor: COLORS[p.kind], fillOpacity: 1,
      }).addTo(map);
    }
    const sizer = window.setTimeout(() => map.invalidateSize(), 100);
    return () => { window.clearTimeout(sizer); map.remove(); };
  }, []);

  return (
    <div className={styles.screen} data-screen-label="Home">
      <KioskShell active="home" onNavigate={onNavigate} />
      <div className={styles.col}>
        <div className={styles.row}><div className={styles.title}>What's going on in Newtown?</div><div className={styles.text}>Live right now - tap any tile for more.</div></div>
        <div className={styles.grid}>
          <div className={styles.col2} onClick={() => onNavigate('events')} role="button" tabIndex={0}>
            <div className={styles.row2}><div className={styles.heading} onClick={() => onNavigate('events')} role="button" tabIndex={0}>Events</div><div className={styles.text2}>3 today →</div></div>
            <div className={styles.row3}>
              <div className={styles.col3}><div className={styles.thumb} style={{ backgroundImage: 'url(/makersMarket.jpg)' }} /><div className={styles.top}><div className={styles.text3}>Makers Market</div><div className={styles.desc}>Forty local stalls of ceramics, prints, plants and street food, with live acoustic sets from 2 pm.</div></div><div className={styles.text4}>In 2 h 15 m · 350 m</div></div>
              <div className={styles.col3}><div className={styles.thumb} style={{ backgroundImage: 'url(/open-mic.jpg)' }} /><div className={styles.top}><div className={styles.text3}>Open-mic at The Yard</div><div className={styles.desc}>Five-minute slots for music, poetry and comedy. Sign-up opens at 19:00.</div></div><div className={styles.text4}>Tonight 19:30 · Free</div></div>
            </div>
          </div>
          <div className={styles.col4} onClick={() => onNavigate('map')} role="button" tabIndex={0}>
            <div className={styles.row2}><div className={styles.heading2} onClick={() => onNavigate('map')} role="button" tabIndex={0}>Map</div><div className={styles.text5}>Explore →</div></div>
            <div ref={mapEl} className={styles.mapPlaceholder} />
          </div>
          <div className={styles.col5} onClick={() => onNavigate('transport')} role="button" tabIndex={0}>
            <div className={styles.row2}><div className={styles.heading3} onClick={() => onNavigate('transport')} role="button" tabIndex={0}>Transport</div><div className={styles.text6}>All departures →</div></div>
            <div className={styles.col6}>
              {soonest.map((d) => (
                <div key={d.id} className={styles.row4}>
                  <div className={styles.text7} style={{ background: modeColors[d.mode].bg, color: modeColors[d.mode].fg }}>{d.line}</div>
                  <div className={styles.text8}>{d.dest} · {d.via}</div>
                  <div className={styles.text9}>{d.min} min</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col7} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>
            <div className={styles.row2}><div className={styles.heading4} onClick={() => onNavigate('requests')} role="button" tabIndex={0}>Requests</div><div className={styles.text10}>6 open →</div></div>
            <div className={styles.row3}>
              <div className={styles.col3}><div className={styles.top}><div className={styles.text11}>Two more for Saturday basketball?</div><div className={styles.desc}>Friendly half-court game, all skill levels welcome. Spare ball and bibs provided.</div></div><div className={styles.text12}>Tien · 2 slots left</div></div>
              <div className={styles.col3}><div className={styles.top}><div className={styles.text11}>Chess in Camperdown park</div><div className={styles.desc}>Boards set up near the big fig every Saturday afternoon. All ages, all levels.</div></div><div className={styles.text12}>Jacob · anyone welcome</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row5}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row6}>
          <div className={styles.pill2} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar}></div>Events</div>
          <div className={styles.pill3} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar2}></div>Map</div>
          <div className={styles.pill4} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar3}></div>Transport</div>
          <div className={styles.pill5} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar4}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <div className={styles.row7}><div className={styles.text13}>Text size</div><div className={styles.avatar5}>A</div><div className={styles.avatar6}>A</div></div>
      </div>
    </div>
  );
}
