/* LocalLoop kiosk — mock data. Single source of truth for every screen.
   Everything here is fake but shaped like a real feed; swap for an API later.
   ponytail: rolling mock clock (see minutesLeft), no backend. */
import { useEffect, useRef, useState } from 'react';
import type { ScreenId } from './types';

export interface EventItem {
  id: string;
  title: string;
  whenLabel: string;   // human line shown on cards ("Sat 12:00 – 17:00 · … · Free")
  dueInMin: number;    // minutes until it starts, from first load — drives "starts in"
  venue: string;
  distanceM: number;
  tint: string;        // photo placeholder colour
  image: string;       // event photo (Unsplash)
  tags: string[];      // "Free", "Family", … used by filters later
  blurb: string;
}

export interface RequestItem {
  id: string;
  category: string;    // chip label: SPORT, RUN, MUSIC, …
  author: string;
  postedAt: string;
  title: string;
  blurb: string;
  slotsLabel: string;  // "2 slots left" / "Open to all" / "Drop in"
  whenLabel: string;   // "Sat 9:00"
  venue: string;
  walkLabel: string;   // "14 min walk · step-free"
}

export type Mode = 'bus' | 'train' | 'metro';

export interface Departure {
  id: string;
  mode: Mode;
  line: string;        // 422, T2, M1
  dest: string;
  via: string;         // "via St Peters" / "Platform 1"
  dueInMin: number;
  crowding: 0 | 1 | 2; // 0 seats, 1 some, 2 standing only
  routeId?: string;    // link to a BusRoute for bus detail
}

export interface RouteStop {
  name: string;
  time: string;
  current?: boolean;
  last?: boolean;
}

export interface BusRoute {
  id: string;
  line: string;
  headsign: string;
  stops: RouteStop[];
}

export type MapKind = 'event' | 'request' | 'stop' | 'park';

export interface MapPoint {
  id: string;
  kind: MapKind;
  label: string;
  lat: number;
  lng: number;
  target?: { screen: ScreenId; id?: string };
}

/** Map centre + zoom for the Newtown kiosk. */
export const mapCenter = { lat: -33.8983, lng: 151.179, zoom: 15 };

export const suburb = 'Newtown';

export const events: EventItem[] = [
  {
    id: 'makers-market',
    title: 'Makers Market',
    whenLabel: 'Sat 12:00 – 17:00 · Camperdown Memorial Rest Park · Free',
    dueInMin: 135,
    venue: 'Camperdown Memorial Rest Park',
    distanceM: 350,
    tint: '#F6B963',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=900&q=80',
    tags: ['Free', 'Family'],
    blurb:
      "Forty local stalls of ceramics, prints, plants and street food, with live acoustic sets from 2 pm and a kids' craft corner run by the Newtown library. Dogs on leads welcome.",
  },
  {
    id: 'open-mic-yard',
    title: 'Open-mic night at The Yard',
    whenLabel: 'Tonight 19:30 · The Yard, King St · Free entry',
    dueInMin: 450,
    venue: 'The Yard, King St',
    distanceM: 600,
    tint: '#F49B94',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    tags: ['Free'],
    blurb:
      "Five-minute slots for music, poetry and comedy. Sign-up sheet opens at 19:00 — beginners get the friendliest crowd in the Inner West.",
  },
  {
    id: 'garden-bee',
    title: 'Community garden working bee',
    whenLabel: 'Sun 9:00 – 12:00 · Wilson St gardens · Free, tools provided',
    dueInMin: 1290,
    venue: 'Wilson St gardens',
    distanceM: 850,
    tint: '#A8D8A0',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    tags: ['Free', 'Family'],
    blurb:
      'Help plant the summer beds and take home seedlings. Morning tea provided by the garden crew — kids and first-timers welcome.',
  },
];

export const requests: RequestItem[] = [
  {
    id: 'sat-basketball',
    category: 'SPORT',
    author: 'Tien',
    postedAt: '2 h ago',
    title: 'Two more for Saturday basketball?',
    blurb:
      'Friendly half-court game every Saturday morning, all skill levels genuinely welcome. We have a spare ball and bibs. Usually done by 10:30, then coffee across the road.',
    slotsLabel: '2 slots left',
    whenLabel: 'Sat 9:00',
    venue: 'Fraser Park courts',
    walkLabel: '14 min walk · step-free',
  },
  {
    id: 'sunday-run',
    category: 'RUN',
    author: 'Josh',
    postedAt: '5 h ago',
    title: 'Slow Sunday run crew, 5 km',
    blurb: 'Easy pace along the Cooks River path, coffee after. Walkers welcome too.',
    slotsLabel: 'Open to all',
    whenLabel: 'Sun 7:30',
    venue: 'Cooks River path',
    walkLabel: '9 min walk · step-free',
  },
  {
    id: 'garage-jam',
    category: 'MUSIC',
    author: 'Peter',
    postedAt: 'yesterday',
    title: 'Drummer wanted for garage jam',
    blurb: 'Indie covers, Thursday evenings near the station. Kit provided, bring sticks.',
    slotsLabel: '1 slot left',
    whenLabel: 'Thu 18:30',
    venue: 'Near Newtown Station',
    walkLabel: '4 min walk',
  },
  {
    id: 'mulch-move',
    category: 'GARDEN',
    author: 'Aiden',
    postedAt: 'yesterday',
    title: 'Hands to move mulch on Sunday',
    blurb:
      'One trailer load into the Wilson St beds. An hour of your morning, tea and scones after.',
    slotsLabel: '4 slots left',
    whenLabel: 'Sun 10:00',
    venue: 'Wilson St gardens',
    walkLabel: '11 min walk · step-free',
  },
  {
    id: 'park-chess',
    category: 'GAMES',
    author: 'Jacob',
    postedAt: '2 days ago',
    title: 'Chess in Camperdown park',
    blurb: 'Boards set up near the big fig every Saturday afternoon. All ages, all levels.',
    slotsLabel: 'Drop in',
    whenLabel: 'Sat 14:00',
    venue: 'Camperdown Memorial Rest Park',
    walkLabel: '6 min walk · step-free',
  },
  {
    id: 'dinner-cookup',
    category: 'FOOD',
    author: 'Hana',
    postedAt: '3 days ago',
    title: 'Community dinner cook-up',
    blurb:
      'Cooking a big batch for the neighbourhood centre. Choppers and stirrers needed.',
    slotsLabel: '3 slots left',
    whenLabel: 'Fri 17:00',
    venue: 'Neighbourhood centre',
    walkLabel: '8 min walk · step-free',
  },
];

export const departures: Departure[] = [
  { id: 'bus-422', mode: 'bus', line: '422', dest: 'Kogarah', via: 'via St Peters', dueInMin: 3, crowding: 0, routeId: '422' },
  { id: 'bus-426', mode: 'bus', line: '426', dest: 'Dulwich Hill', via: 'via Marrickville Rd', dueInMin: 5, crowding: 1, routeId: '426' },
  { id: 'bus-428', mode: 'bus', line: '428', dest: 'Canterbury', via: 'via Enmore Rd', dueInMin: 8, crowding: 0, routeId: '428' },
  { id: 'bus-423', mode: 'bus', line: '423', dest: 'Kingsgrove', via: 'via King St', dueInMin: 11, crowding: 2, routeId: '423' },
  { id: 'bus-370', mode: 'bus', line: '370', dest: 'Coogee', via: 'via Alexandria', dueInMin: 14, crowding: 0, routeId: '370' },

  { id: 'trn-1', mode: 'train', line: 'T2', dest: 'City Circle', via: 'Platform 1', dueInMin: 2, crowding: 1 },
  { id: 'trn-2', mode: 'train', line: 'T2', dest: 'Leppington', via: 'Platform 2', dueInMin: 6, crowding: 0 },
  { id: 'trn-3', mode: 'train', line: 'T2', dest: 'City Circle', via: 'Platform 1', dueInMin: 12, crowding: 0 },
  { id: 'trn-4', mode: 'train', line: 'T3', dest: 'Lidcombe', via: 'Platform 2', dueInMin: 15, crowding: 1 },
  { id: 'trn-5', mode: 'train', line: 'T2', dest: 'Leppington', via: 'Platform 2', dueInMin: 18, crowding: 0 },

  { id: 'met-1', mode: 'metro', line: 'M1', dest: 'Tallawong', via: 'via Central', dueInMin: 4, crowding: 0 },
  { id: 'met-2', mode: 'metro', line: 'M1', dest: 'Tallawong', via: 'via Central', dueInMin: 8, crowding: 1 },
  { id: 'met-3', mode: 'metro', line: 'M1', dest: 'Tallawong', via: 'via Central', dueInMin: 12, crowding: 0 },
  { id: 'met-4', mode: 'metro', line: 'M1', dest: 'Tallawong', via: 'via Central', dueInMin: 16, crowding: 2 },
  { id: 'met-5', mode: 'metro', line: 'M1', dest: 'Tallawong', via: 'via Central', dueInMin: 20, crowding: 0 },
];

// Bus lines get a route so their detail screen has real stops. Only 422 is
// authored in full; the rest share a short plausible run toward their headsign.
export const busRoutes: Record<string, BusRoute> = {
  '422': {
    id: '422',
    line: '422',
    headsign: 'Kogarah via St Peters',
    stops: [
      { name: 'King St, Stop B — you are here', time: '12:03', current: true },
      { name: 'Newtown Bridge', time: '12:05' },
      { name: 'St Peters Station', time: '12:09' },
      { name: 'Sydenham Station', time: '12:13' },
      { name: 'Tempe Shops', time: '12:17' },
      { name: 'Wolli Creek', time: '12:22' },
      { name: 'Rockdale Plaza', time: '12:28' },
      { name: 'Kogarah — last stop', time: '12:34', last: true },
    ],
  },
  '426': {
    id: '426', line: '426', headsign: 'Dulwich Hill via Marrickville Rd',
    stops: [
      { name: 'King St, Stop B — you are here', time: '12:05', current: true },
      { name: 'Enmore Rd', time: '12:09' },
      { name: 'Marrickville Rd', time: '12:15' },
      { name: 'Dulwich Hill — last stop', time: '12:24', last: true },
    ],
  },
  '428': {
    id: '428', line: '428', headsign: 'Canterbury via Enmore Rd',
    stops: [
      { name: 'King St, Stop B — you are here', time: '12:08', current: true },
      { name: 'Enmore Theatre', time: '12:12' },
      { name: 'Marrickville Metro', time: '12:19' },
      { name: 'Canterbury — last stop', time: '12:29', last: true },
    ],
  },
  '423': {
    id: '423', line: '423', headsign: 'Kingsgrove via King St',
    stops: [
      { name: 'King St, Stop B — you are here', time: '12:11', current: true },
      { name: 'St Peters', time: '12:16' },
      { name: 'Bexley Rd', time: '12:26' },
      { name: 'Kingsgrove — last stop', time: '12:38', last: true },
    ],
  },
  '370': {
    id: '370', line: '370', headsign: 'Coogee via Alexandria',
    stops: [
      { name: 'King St, Stop B — you are here', time: '12:14', current: true },
      { name: 'Alexandria', time: '12:22' },
      { name: 'UNSW', time: '12:36' },
      { name: 'Coogee — last stop', time: '12:48', last: true },
    ],
  },
};

// Pins placed on real Newtown coordinates for the OpenStreetMap layer.
export const mapPoints: MapPoint[] = [
  { id: 'mp-makers', kind: 'event', label: 'Makers Market', lat: -33.8963, lng: 151.1768, target: { screen: 'eventDetail', id: 'makers-market' } },
  { id: 'mp-yard', kind: 'event', label: 'Open-mic · The Yard', lat: -33.8956, lng: 151.1801, target: { screen: 'eventDetail', id: 'open-mic-yard' } },
  { id: 'mp-garden', kind: 'event', label: 'Garden working bee', lat: -33.8999, lng: 151.1809, target: { screen: 'eventDetail', id: 'garden-bee' } },

  { id: 'mp-basketball', kind: 'request', label: 'Sat basketball', lat: -33.9068, lng: 151.1732, target: { screen: 'requestDetail', id: 'sat-basketball' } },
  { id: 'mp-run', kind: 'request', label: 'Sunday run', lat: -33.9041, lng: 151.1712, target: { screen: 'requestDetail', id: 'sunday-run' } },
  { id: 'mp-jam', kind: 'request', label: 'Garage jam', lat: -33.8989, lng: 151.1796, target: { screen: 'requestDetail', id: 'garage-jam' } },
  { id: 'mp-chess', kind: 'request', label: 'Park chess', lat: -33.8969, lng: 151.1773, target: { screen: 'requestDetail', id: 'park-chess' } },

  { id: 'mp-stop-b', kind: 'stop', label: 'King St · Stop B', lat: -33.8975, lng: 151.179, target: { screen: 'transport' } },
  { id: 'mp-station', kind: 'stop', label: 'Newtown Station', lat: -33.8983, lng: 151.1793, target: { screen: 'transport' } },
  { id: 'mp-sydenham', kind: 'stop', label: 'Sydenham · M1', lat: -33.911, lng: 151.1668, target: { screen: 'transport' } },

  { id: 'mp-camperdown', kind: 'park', label: 'Camperdown park', lat: -33.8967, lng: 151.1772 },
  { id: 'mp-wilson', kind: 'park', label: 'Wilson St gardens', lat: -33.9001, lng: 151.1808 },
];

/** Rolling countdown in whole minutes. Ticks down from load; when it passes
 *  arrival it cycles back to the top so the board never empties in a demo. */
export function minutesLeft(dueInMin: number, mountedAtMs: number, nowMs: number): number {
  const elapsed = (nowMs - mountedAtMs) / 60000;
  const left = dueInMin - elapsed;
  if (left > 0) return Math.ceil(left);
  const cycle = dueInMin || 1;
  return Math.ceil(((left % cycle) + cycle) % cycle) || cycle;
}

/** "In 2 h 15 m" / "In 45 m" from a minutes value. */
export function formatIn(min: number): string {
  if (min <= 0) return 'now';
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `In ${m} m`;
  return m === 0 ? `In ${h} h` : `In ${h} h ${m} m`;
}

/** Ticking clock. Returns a live `now` plus the stable mount time to diff against. */
export function useClock(ms = 1000): { now: number; mountedAt: number } {
  const mountedAt = useRef(Date.now()).current;
  const [now, setNow] = useState(mountedAt);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return { now, mountedAt };
}

/** Self-check: unique ids and every map target resolves to real data. */
export function demo(): void {
  const ids = [...events, ...requests, ...departures].map((x) => x.id);
  console.assert(new Set(ids).size === ids.length, 'duplicate ids in data.ts');
  for (const p of mapPoints) {
    if (!p.target?.id) continue;
    const ok =
      events.some((e) => e.id === p.target!.id) ||
      requests.some((r) => r.id === p.target!.id) ||
      Boolean(busRoutes[p.target!.id]);
    console.assert(ok, `map point ${p.id} → unresolved target ${p.target!.id}`);
  }
  console.log('data.ts demo ok');
}
