import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import KioskShell from '../KioskShell';
import TextSizeToggle from '../TextSizeToggle';
import type { KioskScreenProps } from '../types';
import { mapCenter, mapPoints, bbqMapPoint, type MapKind } from '../data';
import styles from './MapScreen.module.css';

const COLORS: Record<MapKind, string> = {
  event: '#F6B963',
  stop: '#F49B94',
  request: '#8FDCF2',
  park: '#C9E67E',
};

const LAYERS: { kind: MapKind; label: string; pill: string; dot: string }[] = [
  { kind: 'event', label: 'Events', pill: styles.pill, dot: styles.avatar },
  { kind: 'stop', label: 'Transport stops', pill: styles.pill2, dot: styles.avatar2 },
  { kind: 'request', label: 'Requests', pill: styles.pill3, dot: styles.avatar3 },
  { kind: 'park', label: 'Parks & toilets', pill: styles.pill4, dot: styles.avatar4 },
];

/** Teardrop pin as a divIcon so bundling never breaks the marker image.   */
function pinIcon(kind: MapKind, label: string) {
  const color = COLORS[kind];
  return L.divIcon({
    className: 'll-pin',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html:
      `<div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*4)">` +
      `<div style="width:calc(var(--u)*26);height:calc(var(--u)*26);border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:3px solid #fff;box-shadow:0 3px 10px rgba(60,50,30,.28)"></div>` +
      `<div style="font:800 calc(var(--u)*17)/1.1 Nunito,system-ui,sans-serif;color:#2B2723;background:rgba(255,255,255,.92);padding:calc(var(--u)*3) calc(var(--u)*10);border-radius:999px;white-space:nowrap;box-shadow:0 2px 6px rgba(60,50,30,.15)">${label}</div>` +
      `</div>`,
  });
}

/** 1j · Map - OpenStreetMap with data pins, working layer filters + zoom. */
export default function MapScreen({ onNavigate, largeText, onLargeText, published }: KioskScreenProps) {
  const [active, setActive] = useState<Set<MapKind>>(
    () => new Set<MapKind>(['event', 'stop', 'request', 'park']),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ kind: MapKind; marker: L.Marker }[]>([]);

  // Build the map once. Guard against StrictMode's double-invoke and clear the
  // pending invalidateSize so it never fires on a torn-down map (ghost layer).
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: false, attributionControl: false }).setView(
      [mapCenter.lat, mapCenter.lng],
      mapCenter.zoom,
    );
    L.tileLayer(
      `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`,
      { maxZoom: 19, attribution: '© MapTiler © OpenStreetMap contributors' },
    ).addTo(map);

    L.circleMarker([mapCenter.lat, mapCenter.lng], {
      radius: 9,
      color: '#FFFFFF',
      weight: 3,
      fillColor: '#2B2723',
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip('You are here', { direction: 'top', offset: [0, -6] });

    markersRef.current = mapPoints.map((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: pinIcon(p.kind, p.label) });
      if (p.target) marker.on('click', () => onNavigate(p.target!.screen, p.target!.id));
      marker.addTo(map);
      return { kind: p.kind, marker };
    });
    mapRef.current = map;
    const sizer = window.setTimeout(() => map.invalidateSize(), 100);

    return () => {
      window.clearTimeout(sizer);
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [onNavigate]);

  // Show/hide individual pins whenever a filter toggles.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const { kind, marker } of markersRef.current) {
      if (active.has(kind)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    }
  }, [active]);

  // The BBQ pin appears once the request is posted (and respects the Requests filter).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !published || !active.has('request')) return;
    const marker = L.marker([bbqMapPoint.lat, bbqMapPoint.lng], { icon: pinIcon('request', bbqMapPoint.label) });
    marker.on('click', () => onNavigate(bbqMapPoint.target!.screen, bbqMapPoint.target!.id));
    marker.addTo(map);
    return () => { marker.remove(); };
  }, [published, active, onNavigate]);

  const toggle = (kind: MapKind) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(kind) ? next.delete(kind) : next.add(kind);
      return next;
    });
  const count = (kind: MapKind) =>
    mapPoints.filter((p) => p.kind === kind).length + (kind === 'request' && published ? 1 : 0);

  return (
    <div className={styles.screen} data-screen-label="Map">
      <KioskShell active="map" onNavigate={onNavigate} />
      <div className={styles.row}>
        <div ref={containerRef} className={styles.canvas} />

        <div className={styles.pin}>
          <div className={styles.text}>Show on map</div>
          {LAYERS.map((l) => (
            <button
              key={l.kind}
              type="button"
              className={`${l.pill} ${active.has(l.kind) ? '' : styles.pillOff}`}
              onClick={() => toggle(l.kind)}
            >
              <div className={l.dot}></div>
              {l.label}{l.kind === 'event' || l.kind === 'request' ? ` · ${count(l.kind)}` : ''}
            </button>
          ))}
        </div>
        <div className={styles.pin2}>
          <button type="button" className={styles.card} onClick={() => mapRef.current?.zoomIn()}>+</button>
          <button type="button" className={styles.card} onClick={() => mapRef.current?.zoomOut()}>−</button>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.pill8} onClick={() => onNavigate('home')} role="button" tabIndex={0}>Home</div>
        <div className={styles.box}></div>
        <div className={styles.row3}>
          <div className={styles.pill9} onClick={() => onNavigate('events')} role="button" tabIndex={0}><div className={styles.avatar6}></div>Events</div>
          <div className={styles.pill10} onClick={() => onNavigate('map')} role="button" tabIndex={0}><div className={styles.avatar7}></div>Map</div>
          <div className={styles.pill11} onClick={() => onNavigate('transport')} role="button" tabIndex={0}><div className={styles.avatar8}></div>Transport</div>
          <div className={styles.pill12} onClick={() => onNavigate('requests')} role="button" tabIndex={0}><div className={styles.avatar9}></div>Requests</div>
        </div>
        <div className={styles.box}></div>
        <TextSizeToggle largeText={largeText} onLargeText={onLargeText} />
      </div>
    </div>
  );
}
