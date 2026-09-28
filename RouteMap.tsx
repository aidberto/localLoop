import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteStop } from './data';

/** Leaflet map that traces a route: a line through the stops with a marker at
 *  each, the "you are here" stop highlighted. Fits the view to the stops. */
export default function RouteMap({ stops, color, className }: { stops: RouteStop[]; color: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const pts = stops.map((s) => [s.lat, s.lng] as [number, number]);
    const map = L.map(ref.current, { zoomControl: false, attributionControl: true });
    L.tileLayer(
      `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`,
      { maxZoom: 19, attribution: '© MapTiler © OpenStreetMap contributors' },
    ).addTo(map);

    L.polyline(pts, { color, weight: 5, opacity: 0.85 }).addTo(map);
    stops.forEach((s) => {
      L.circleMarker([s.lat, s.lng], {
        radius: s.current ? 9 : 6,
        color: '#FFFFFF',
        weight: 3,
        fillColor: s.current ? '#2B2723' : color,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(s.name.replace(' — you are here', '').replace(' — last stop', ''), { direction: 'top', offset: [0, -6] });
    });

    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
    mapRef.current = map;
    const sizer = window.setTimeout(() => map.invalidateSize(), 100);
    return () => {
      window.clearTimeout(sizer);
      map.remove();
      mapRef.current = null;
    };
  }, [stops, color]);

  return <div ref={ref} className={className} />;
}
