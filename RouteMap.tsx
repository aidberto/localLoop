import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteStop } from './data';

type Profile = 'foot' | 'driving';

// Keyless OSM router (FOSSGIS OSRM demo). Returns road/path-following geometry
// through the stops; caller falls back to straight lines if it's unreachable.
async function routePath(pts: [number, number][], profile: Profile): Promise<[number, number][]> {
  const seg = profile === 'foot' ? 'routed-foot' : 'routed-car';
  const coords = pts.map(([lat, lng]) => `${lng},${lat}`).join(';');
  const url = `https://routing.openstreetmap.de/${seg}/route/v1/${profile}/${coords}?overview=full&geometries=geojson`;
  const j = await (await fetch(url)).json();
  return j.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
}

/** Leaflet map that traces a route: a line through the stops with a marker at
 *  each, the "you are here" stop highlighted. Fits the view to the stops. With
 *  a `profile` the line follows real roads/paths; without it, straight segments
 *  (right for trains/metro, which don't follow roads). */
export default function RouteMap({ stops, color, className, profile, lineColor, endpointsOnly }: { stops: RouteStop[]; color: string; className?: string; profile?: Profile; lineColor?: string; endpointsOnly?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const pts = stops.map((s) => [s.lat, s.lng] as [number, number]);
    // ponytail: attribution off — mid-fi mock, not a shipped tile product.
    const map = L.map(ref.current, { zoomControl: false, attributionControl: false });
    L.tileLayer(
      `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`,
      { maxZoom: 19 },
    ).addTo(map);

    const line = L.polyline(pts, { color: lineColor ?? color, weight: 5, opacity: 0.85 }).addTo(map);
    if (profile) routePath(pts, profile).then((path) => { if (mapRef.current) line.setLatLngs(path); }).catch(() => {});
    stops.forEach((s) => {
      if (endpointsOnly && !s.current && !s.last) return;
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
  }, [stops, color, profile, lineColor, endpointsOnly]);

  return <div ref={ref} className={className} />;
}
