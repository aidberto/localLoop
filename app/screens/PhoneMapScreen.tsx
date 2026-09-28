import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PhoneScreenProps, PhoneScreenId } from '../types';
import { mapCenter, mapPoints, type MapKind } from '../../data';
import styles from './PhoneMapScreen.module.css';

const COLORS: Record<MapKind, string> = {
  event: '#F6B963',
  stop: '#F49B94',
  request: '#8FDCF2',
  park: '#C9E67E',
};

const LAYERS: { kind: MapKind; label: string; chip: string; dot: string }[] = [
  { kind: 'event', label: 'Events', chip: styles.chip, dot: styles.avatar },
  { kind: 'stop', label: 'Transport', chip: styles.chip2, dot: styles.avatar2 },
  { kind: 'request', label: 'Requests', chip: styles.chip3, dot: styles.avatar3 },
  { kind: 'park', label: 'Parks', chip: styles.chip4, dot: styles.avatar4 },
];

/** Teardrop pin as a divIcon so bundling never breaks the marker image. */
function pinIcon(kind: MapKind, label: string) {
  const color = COLORS[kind];
  return L.divIcon({
    className: 'll-pin',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html:
      `<div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:calc(var(--pu)*3)">` +
      `<div style="width:calc(var(--pu)*22);height:calc(var(--pu)*22);border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:3px solid #fff;box-shadow:0 3px 10px rgba(60,50,30,.28)"></div>` +
      `<div style="font:800 calc(var(--pu)*12)/1.1 Nunito,system-ui,sans-serif;color:#2B2723;background:rgba(255,255,255,.92);padding:calc(var(--pu)*2) calc(var(--pu)*8);border-radius:999px;white-space:nowrap;box-shadow:0 2px 6px rgba(60,50,30,.15)">${label}</div>` +
      `</div>`,
  });
}

/** 2l · App map · OpenStreetMap with data pins, layer filters + zoom. */
export default function PhoneMapScreen({ onNavigate }: PhoneScreenProps) {
  const [active, setActive] = useState<Set<MapKind>>(
    () => new Set<MapKind>(['event', 'stop', 'request', 'park']),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ kind: MapKind; marker: L.Marker }[]>([]);

  // Build the map once; guard StrictMode double-invoke and clear the pending
  // invalidateSize so it never fires on a torn-down map.
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
      radius: 8,
      color: '#FFFFFF',
      weight: 3,
      fillColor: '#2B2723',
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip('You are here', { direction: 'top', offset: [0, -6] });

    markersRef.current = mapPoints.map((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: pinIcon(p.kind, p.label) });
      if (p.target) marker.on('click', () => onNavigate(p.target!.screen as PhoneScreenId, p.target!.id));
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

  // Show/hide pins whenever a filter toggles.
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

  const toggle = (kind: MapKind) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(kind) ? next.delete(kind) : next.add(kind);
      return next;
    });

  return (
    <div className={styles.screen} data-screen-label="App map">
      <div className={styles.row}>
        <div className={styles.pill} onClick={() => onNavigate('home')} role="button" tabIndex={0}>‹ Home</div>
        <div className={styles.heading}>Map of Newtown</div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.mapPlaceholder}>
        <div ref={containerRef} className={styles.canvas} />
        <div className={styles.row2}>
          {LAYERS.map((l) => (
            <button
              key={l.kind}
              type="button"
              className={`${l.chip} ${active.has(l.kind) ? '' : styles.chipOff}`}
              onClick={() => toggle(l.kind)}
            >
              <div className={l.dot}></div>{l.label}
            </button>
          ))}
        </div>
        <div className={styles.pin6}>
          <button type="button" className={styles.title} onClick={() => mapRef.current?.zoomIn()}>+</button>
          <button type="button" className={styles.title} onClick={() => mapRef.current?.zoomOut()}>−</button>
        </div>
      </div>
    </div>
  );
}
