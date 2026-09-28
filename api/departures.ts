// Vercel serverless proxy for Transport for NSW live departures.
// Holds the API key server-side (never shipped to the browser) and maps the
// TfNSW Departure Monitor response onto the kiosk's Departure shape.
//
// Env: TFNSW_API_KEY  (set in Vercel project settings, and .env.local for `vercel dev`)

const BASE = 'https://api.transport.nsw.gov.au/v1/tp/departure_mon';

// Newtown Station only — buses + trains that actually call at Newtown.
// (Sydenham/metro is a different suburb, so it's excluded.) class 1 = train, 5 = bus.
const STOPS = ['204210'];

const MODE_BY_CLASS: Record<number, 'bus' | 'train' | 'metro'> = { 1: 'train', 2: 'metro', 5: 'bus' };

// TfNSW occupancy strings → the kiosk's 0/1/2 crowding dots.
function crowding(occ?: string): 0 | 1 | 2 {
  switch (occ) {
    case 'FEW_SEATS': return 1;
    case 'STANDING_ONLY':
    case 'CRUSHED_STANDING_ONLY':
    case 'FULL':
    case 'NOT_ACCEPTING_PASSENGERS': return 2;
    default: return 0; // MANY_SEATS, EMPTY, unknown/absent
  }
}

// TfNSW interprets itdDate/itdTime as Sydney local time; Vercel runs in UTC,
// so format the current instant in Australia/Sydney explicitly.
function sydneyNow() {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date()).reduce<Record<string, string>>((a, x) => ((a[x.type] = x.value), a), {});
  return { date: `${p.year}${p.month}${p.day}`, time: `${p.hour}${p.minute}` };
}

async function fetchStop(stop: string, key: string) {
  const { date: itdDate, time: itdTime } = sydneyNow();
  const url =
    `${BASE}?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&mode=direct` +
    `&type_dm=stop&name_dm=${stop}&itdDate=${itdDate}&itdTime=${itdTime}` +
    `&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42`;
  const r = await fetch(url, { headers: { Authorization: `apikey ${key}` } });
  if (!r.ok) throw new Error(`TfNSW ${stop} ${r.status}`);
  const data = await r.json();
  return (data.stopEvents ?? []) as any[];
}

// Core fetch + map, shared by the Vercel handler and the vite dev middleware.
export async function getDepartures(key: string) {
  const events = (await Promise.all(STOPS.map((s) => fetchStop(s, key)))).flat();
  const nowMs = Date.now();
  return events
      .map((e) => {
        const t = e.transportation ?? {};
        const mode = MODE_BY_CLASS[t.product?.class];
        if (!mode) return null; // skip light rail / coach / ferry etc.
        const dueAt = new Date(e.departureTimeEstimated ?? e.departureTimePlanned).getTime();
        const line = String(t.number ?? '').split(' ')[0]; // "T2 Leppington..." → "T2"
        return {
          id: `${mode}-${line}-${dueAt}`,
          mode,
          line,
          dest: t.destination?.name ?? '',
          via: (e.location?.properties?.platformName ?? '').split(',').pop()?.trim() ?? '',
          dueInMin: Math.max(0, Math.round((dueAt - nowMs) / 60000)),
          dueAt,
          crowding: crowding(e.location?.properties?.occupancy),
          routeId: mode === 'bus' ? line : undefined,
        };
      })
    .filter(Boolean)
    .filter((d: any) => d.dueAt >= nowMs - 60000) // drop already-departed
    .sort((a: any, b: any) => a.dueAt - b.dueAt);
}

export default async function handler(_req: any, res: any) {
  const key = process.env.TFNSW_API_KEY;
  if (!key) return res.status(500).json({ error: 'TFNSW_API_KEY not set' });
  try {
    // 30s browser/CDN cache so the kiosk polling doesn't hammer the quota.
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=30');
    res.status(200).json(await getDepartures(key));
  } catch (err: any) {
    res.status(502).json({ error: String(err?.message ?? err) });
  }
}
