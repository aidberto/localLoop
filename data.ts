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
  route?: RouteStop[]; // walking path from the kiosk to the venue, for "getting there"
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
  route?: RouteStop[]; // walking path from the kiosk to the venue, for "getting there"
}

export type Mode = 'bus' | 'train' | 'metro';

// Authentic Transport for NSW mode colours for line pills. Red is Sydney's
// LIGHT RAIL colour, so line pills never use red — train orange, metro teal,
// bus blue keep Sydneysider mental models intact.
export const modeColors: Record<Mode, { bg: string; fg: string }> = {
  train: { bg: '#F6891F', fg: '#FFFFFF' }, // Sydney Trains orange
  metro: { bg: '#009B95', fg: '#FFFFFF' }, // Sydney Metro teal
  bus: { bg: '#00B5EF', fg: '#00131A' },   // Bus blue
};

export interface Departure {
  id: string;
  mode: Mode;
  line: string;        // 422, T2, M1
  dest: string;
  via: string;         // "via St Peters" / "Platform 1"
  dueInMin: number;
  dueAt?: number;      // epoch ms of real (live) departure; absent = mock rolling clock
  crowding: 0 | 1 | 2; // 0 seats, 1 some, 2 standing only
  routeId?: string;    // link to a BusRoute for bus detail
}

/** Live departures from the TfNSW proxy (see api/departures.ts). Returns null
 *  on any failure so callers fall back to the static `departures` mock. */
export async function fetchDepartures(): Promise<Departure[] | null> {
  try {
    const r = await fetch('/api/departures');
    if (!r.ok) return null;
    const data = (await r.json()) as Departure[];
    return Array.isArray(data) && data.length ? data : null;
  } catch {
    return null;
  }
}

export interface RouteStop {
  name: string;
  time: string;
  lat: number;
  lng: number;
  current?: boolean;
  last?: boolean;
}

export interface BusRoute {
  id: string;
  line: string;
  headsign: string;
  mode?: Mode;         // defaults to bus; set for train/metro detail labels
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
    image: '/makersMarket.jpg',
    tags: ['Free', 'Family'],
    blurb:
      "Forty local stalls of ceramics, prints, plants and street food, with live acoustic sets from 2 pm and a kids' craft corner run by the Newtown library. Dogs on leads welcome.",
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St at Church St', time: '2 min', lat: -33.897102, lng: 151.177204 },
      { name: 'Australia St', time: '4 min', lat: -33.896214, lng: 151.175683 },
      { name: 'Camperdown Memorial Rest Park — last stop', time: '5 min', lat: -33.895812, lng: 151.174512, last: true },
    ],
  },
  {
    id: 'open-mic-yard',
    title: 'Open-mic night at The Yard',
    whenLabel: 'Tonight 19:30 · The Yard, King St · Free entry',
    dueInMin: 450,
    venue: 'The Yard, King St',
    distanceM: 600,
    tint: '#F49B94',
    image: '/open-mic.jpg',
    tags: ['Free'],
    blurb:
      "Five-minute slots for music, poetry and comedy. Sign-up sheet opens at 19:00 — beginners get the friendliest crowd in the Inner West.",
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St opp Camden St', time: '3 min', lat: -33.899920, lng: 151.178125 },
      { name: 'King St opp Holmwood St', time: '6 min', lat: -33.901907, lng: 151.179022 },
      { name: 'The Yard, King St — last stop', time: '8 min', lat: -33.903200, lng: 151.179800, last: true },
    ],
  },
  {
    id: 'garden-bee',
    title: 'Community garden working bee',
    whenLabel: 'Sun 9:00 – 12:00 · Wilson St gardens · Free, tools provided',
    dueInMin: 1290,
    venue: 'Wilson St gardens',
    distanceM: 850,
    tint: '#A8D8A0',
    image: '/CommunityGarden.jpeg',
    tags: ['Free', 'Family'],
    blurb:
      'Help plant the summer beds and take home seedlings. Morning tea provided by the garden crew — kids and first-timers welcome.',
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'Wilson St at Station', time: '3 min', lat: -33.898900, lng: 151.177500 },
      { name: 'Wilson St', time: '7 min', lat: -33.900200, lng: 151.175800 },
      { name: 'Wilson St gardens — last stop', time: '11 min', lat: -33.901600, lng: 151.174300, last: true },
    ],
  },
  {
    id: 'vinyl-fair',
    title: 'Vinyl fair at the Hub',
    whenLabel: 'Next Sat 10:00 – 15:00 · Newtown Neighbourhood Hub · $2',
    dueInMin: 2010,
    venue: 'Newtown Neighbourhood Hub',
    distanceM: 1100,
    tint: '#C9B7E8',
    image: '/newtown3.jpg',
    tags: ['Music'],
    blurb:
      'Crates from 30 sellers, plus coffee and a swap table. Bring your wants list and dig for B-sides — $2 on the door goes to the community centre.',
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St at Church St', time: '4 min', lat: -33.897102, lng: 151.177204 },
      { name: 'Australia St', time: '9 min', lat: -33.896214, lng: 151.175683 },
      { name: 'Newtown Neighbourhood Hub — last stop', time: '13 min', lat: -33.894900, lng: 151.173200, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'Enmore Rd at Simmons St', time: '5 min', lat: -33.901500, lng: 151.173500 },
      { name: 'Marrickville Rd', time: '10 min', lat: -33.906000, lng: 151.169000 },
      { name: 'Fraser Park courts — last stop', time: '14 min', lat: -33.908600, lng: 151.166500, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'Alice St', time: '4 min', lat: -33.901800, lng: 151.181500 },
      { name: 'Sydenham Rd', time: '7 min', lat: -33.905500, lng: 151.183500 },
      { name: 'Cooks River path — last stop', time: '9 min', lat: -33.908000, lng: 151.184500, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'Wilson St', time: '2 min', lat: -33.897200, lng: 151.176800 },
      { name: 'Holt St — last stop', time: '4 min', lat: -33.896500, lng: 151.175500, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'Wilson St at Station', time: '3 min', lat: -33.898900, lng: 151.177500 },
      { name: 'Wilson St', time: '7 min', lat: -33.900200, lng: 151.175800 },
      { name: 'Wilson St gardens — last stop', time: '11 min', lat: -33.901600, lng: 151.174300, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St at Church St', time: '2 min', lat: -33.897102, lng: 151.177204 },
      { name: 'Australia St', time: '4 min', lat: -33.896214, lng: 151.175683 },
      { name: 'Camperdown Memorial Rest Park — last stop', time: '6 min', lat: -33.895812, lng: 151.174512, last: true },
    ],
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
    route: [
      { name: 'Newtown Station — you are here', time: 'now', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St at Egan St', time: '4 min', lat: -33.900500, lng: 151.178800 },
      { name: 'Neighbourhood centre — last stop', time: '8 min', lat: -33.902800, lng: 151.177000, last: true },
    ],
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
// Real stop sequences pulled from the TfNSW Trip Planner (see
// scratchpad/genroutes.mjs). Times are a representative midday run.
export const busRoutes: Record<string, BusRoute> = {
  '370': {
    id: '370', line: '370', headsign: 'Coogee via Alexandria',
    stops: [
      { name: 'Newtown Station — you are here', time: '12:01', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St opp Holt St', time: '12:02', lat: -33.89992, lng: 151.178125 },
      { name: 'King St opp Camden St', time: '12:03', lat: -33.901907, lng: 151.179022 },
      { name: 'King St opp Holmwood St', time: '12:03', lat: -33.903817, lng: 151.180109 },
      { name: 'King St opp St Peters Station', time: '12:05', lat: -33.906369, lng: 151.181347 },
      { name: 'Sydney Park Rd opp Sydney Park', time: '12:05', lat: -33.906853, lng: 151.182235 },
      { name: 'Mitchell Rd after Coulson St', time: '12:07', lat: -33.906179, lng: 151.188264 },
      { name: 'Mitchell Rd opp Maddox St', time: '12:08', lat: -33.904926, lng: 151.189337 },
      { name: 'Erskineville Oval', time: '12:10', lat: -33.902601, lng: 151.191471 },
      { name: 'Mitchell Rd after Copeland St', time: '12:11', lat: -33.901427, lng: 151.192602 },
      { name: 'Fountain St opp Lawrence St', time: '12:12', lat: -33.901602, lng: 151.194609 },
      { name: 'McEvoy St at Loveridge St', time: '12:14', lat: -33.902198, lng: 151.19801 },
      { name: 'McEvoy St before Wyndham St', time: '12:14', lat: -33.90183, lng: 151.199537 },
      { name: 'Yudi Gunyi School', time: '12:16', lat: -33.904053, lng: 151.20251 },
      { name: 'Green Square Station', time: '12:18', lat: -33.906982, lng: 151.203032 },
      { name: 'Epsom Rd at Dunning Ave', time: '12:20', lat: -33.910382, lng: 151.204517 },
      { name: 'Epsom Rd opp Dalmeny Ave', time: '12:22', lat: -33.91181, lng: 151.210423 },
      { name: 'Epsom Rd after Link Rd', time: '12:23', lat: -33.912001, lng: 151.211686 },
      { name: 'Lenthall St at McDougall St', time: '12:25', lat: -33.910765, lng: 151.216726 },
      { name: 'Todman Ave at Balfour Rd', time: '12:26', lat: -33.909503, lng: 151.220175 },
      { name: 'Anzac Pde after Darling St', time: '12:28', lat: -33.911554, lng: 151.22341 },
      { name: 'Anzac Pde before Doncaster Ave', time: '12:29', lat: -33.912649, lng: 151.224329 },
      { name: 'High St opp UNSW Gate 2', time: '12:31', lat: -33.915095, lng: 151.227865 },
      { name: 'High St opp UNSW Gate 8', time: '12:32', lat: -33.915876, lng: 151.233707 },
      { name: 'Clara St at Blenheim St', time: '12:36', lat: -33.916527, lng: 151.239402 },
      { name: 'Belmore Rd at Avoca St', time: '12:38', lat: -33.916542, lng: 151.241034 },
      { name: 'Coogee Bay Rd after Belmore Rd', time: '12:40', lat: -33.918084, lng: 151.242581 },
      { name: 'Coogee Bay Rd at St Luke St', time: '12:42', lat: -33.91891, lng: 151.245799 },
      { name: 'Coogee Bay Rd at Melody St', time: '12:44', lat: -33.919669, lng: 151.24937 },
      { name: 'St Brigid\'s Primary School — last stop', time: '12:46', lat: -33.920179, lng: 151.252854, last: true },
    ],
  },
  '422': {
    id: '422', line: '422', headsign: 'Kogarah via St Peters',
    stops: [
      { name: 'Newtown Station — you are here', time: '12:17', lat: -33.898132, lng: 151.178491, current: true },
      { name: 'King St opp Holt St', time: '12:18', lat: -33.89992, lng: 151.178125 },
      { name: 'King St opp Camden St', time: '12:19', lat: -33.901907, lng: 151.179022 },
      { name: 'King St opp Holmwood St', time: '12:20', lat: -33.903817, lng: 151.180109 },
      { name: 'King St opp St Peters Station', time: '12:21', lat: -33.906369, lng: 151.181347 },
      { name: 'Princes Hwy opp Short St', time: '12:23', lat: -33.911019, lng: 151.180277 },
      { name: 'Princes Hwy at Victoria St', time: '12:24', lat: -33.91325, lng: 151.178787 },
      { name: 'Princes Hwy opp St Peters Anglican Church', time: '12:24', lat: -33.914682, lng: 151.176955 },
      { name: 'Princes Hwy before Canal Rd', time: '12:25', lat: -33.915232, lng: 151.17561 },
      { name: 'Princes Hwy opp Sutherland St', time: '12:26', lat: -33.916865, lng: 151.17262 },
      { name: 'Princes Hwy opp Railway Rd', time: '12:27', lat: -33.918546, lng: 151.170357 },
      { name: 'IKEA Tempe', time: '12:28', lat: -33.921156, lng: 151.166194 },
      { name: 'Princes Hwy before Smith St', time: '12:29', lat: -33.922233, lng: 151.163901 },
      { name: 'Princes Hwy at Fanning St', time: '12:30', lat: -33.924336, lng: 151.161409 },
      { name: 'Princes Hwy after Station St', time: '12:31', lat: -33.926097, lng: 151.15942 },
      { name: 'Cahill Park', time: '12:33', lat: -33.931259, lng: 151.154915 },
      { name: 'West Botany St at Flora St', time: '12:34', lat: -33.93433, lng: 151.152838 },
      { name: 'Arncliffe Fire Station', time: '12:36', lat: -33.940219, lng: 151.151341 },
      { name: 'Riverine Park', time: '12:37', lat: -33.943812, lng: 151.150607 },
      { name: 'West Botany St opp Tabrett St', time: '12:38', lat: -33.947186, lng: 151.150188 },
      { name: 'West Botany St after Bestic St', time: '12:39', lat: -33.950124, lng: 151.148849 },
      { name: 'Rockdale Park', time: '12:40', lat: -33.952044, lng: 151.147753 },
      { name: 'Bryant St at Gibbes St', time: '12:41', lat: -33.951572, lng: 151.144379 },
      { name: 'Bryant St at Market St', time: '12:43', lat: -33.951035, lng: 151.140006 },
      { name: 'Rockdale Station', time: '12:44', lat: -33.952513, lng: 151.137862 },
      { name: 'Princes Hwy opp Hegerty St', time: '12:45', lat: -33.95476, lng: 151.137733 },
      { name: 'Princes Hwy after Rockdale Plaza Dr', time: '12:46', lat: -33.957832, lng: 151.138033 },
      { name: 'Princes Hwy opp Harrow Rd', time: '12:47', lat: -33.959263, lng: 151.138081 },
      { name: 'Regent St opp Kogarah High School', time: '12:48', lat: -33.96147, lng: 151.135398 },
      { name: 'Kogarah Station — last stop', time: '12:49', lat: -33.962664, lng: 151.133401, last: true },
    ],
  },
  '423': {
    id: '423', line: '423', headsign: 'Kingsgrove via King St',
    stops: [
      { name: 'Newtown Station — you are here', time: '12:01', lat: -33.897448, lng: 151.17902, current: true },
      { name: 'Enmore Theatre', time: '12:03', lat: -33.898789, lng: 151.174817 },
      { name: 'Enmore Rd at Edgeware Rd', time: '12:04', lat: -33.899346, lng: 151.171409 },
      { name: 'Enmore Rd opp Newington Rd', time: '12:05', lat: -33.902369, lng: 151.169406 },
      { name: 'Enmore Park', time: '12:06', lat: -33.903892, lng: 151.168594 },
      { name: 'Enmore Rd at Victoria Rd', time: '12:07', lat: -33.905343, lng: 151.167789 },
      { name: 'Victoria Rd at Chapel St', time: '12:08', lat: -33.907153, lng: 151.164366 },
      { name: 'Victoria Rd after Sydenham Rd', time: '12:10', lat: -33.910117, lng: 151.161971 },
      { name: 'Victoria Rd before Marrickville Rd', time: '12:11', lat: -33.911868, lng: 151.160565 },
      { name: 'Marrickville Rd at Gladstone St', time: '12:12', lat: -33.911496, lng: 151.158234 },
      { name: 'Marrickville Rd before Illawarra Rd', time: '12:13', lat: -33.910798, lng: 151.156763 },
      { name: 'Marrickville Station', time: '12:15', lat: -33.913814, lng: 151.153105 },
      { name: 'Illawarra Rd at Warren Rd', time: '12:16', lat: -33.915876, lng: 151.15046 },
      { name: 'Illawarra Rd at Cary St', time: '12:17', lat: -33.917146, lng: 151.14889 },
      { name: 'Illawarra Rd opp Hill St', time: '12:18', lat: -33.918855, lng: 151.146034 },
      { name: 'Illawarra Rd opp Wallace St', time: '12:18', lat: -33.919841, lng: 151.144838 },
      { name: 'Steel Park', time: '12:19', lat: -33.921246, lng: 151.143804 },
      { name: 'Homer St after Undercliffe Rd', time: '12:20', lat: -33.923748, lng: 151.142002 },
      { name: 'Undercliffe Public School', time: '12:21', lat: -33.923518, lng: 151.139213 },
      { name: 'Homer St at Bayview Ave', time: '12:22', lat: -33.923634, lng: 151.136279 },
      { name: 'Homer St before Hocking Ave', time: '12:23', lat: -33.925689, lng: 151.13279 },
      { name: 'Homer St at Minnamorra Ave', time: '12:24', lat: -33.926619, lng: 151.130327 },
      { name: 'Our Lady of Lourdes Church', time: '12:25', lat: -33.926658, lng: 151.12673 },
      { name: 'Earlwood Shops', time: '12:26', lat: -33.926826, lng: 151.125235 },
      { name: 'Earlwood Shops', time: '12:26', lat: -33.927383, lng: 151.123663 },
      { name: 'William St opp Cameron Ave', time: '12:27', lat: -33.927043, lng: 151.121182 },
      { name: 'William St opp Woolcott St', time: '12:28', lat: -33.926576, lng: 151.118176 },
      { name: 'William St opp Westfield St', time: '12:29', lat: -33.92679, lng: 151.115268 },
      { name: 'William St at Main St', time: '12:29', lat: -33.927133, lng: 151.113112 },
      { name: 'Clemton Park Shops', time: '12:30', lat: -33.927673, lng: 151.109636 },
      { name: 'William St before Hilltop St', time: '12:32', lat: -33.928439, lng: 151.104755 },
      { name: 'William St at Shackel Ave', time: '12:33', lat: -33.929261, lng: 151.099303 },
      { name: 'Kingsgrove Rd opp Kingsgrove North High School — last stop', time: '12:34', lat: -33.932601, lng: 151.099388, last: true },
    ],
  },
  '426': {
    id: '426', line: '426', headsign: 'Dulwich Hill via Marrickville Rd',
    stops: [
      { name: 'Newtown Station — you are here', time: '12:16', lat: -33.897448, lng: 151.17902, current: true },
      { name: 'Enmore Theatre', time: '12:18', lat: -33.898789, lng: 151.174817 },
      { name: 'Enmore Rd at Edgeware Rd', time: '12:19', lat: -33.899346, lng: 151.171409 },
      { name: 'Enmore Rd opp Newington Rd', time: '12:20', lat: -33.902369, lng: 151.169406 },
      { name: 'Enmore Park', time: '12:21', lat: -33.903892, lng: 151.168594 },
      { name: 'Enmore Rd at Victoria Rd', time: '12:22', lat: -33.905343, lng: 151.167789 },
      { name: 'Victoria Rd at Chapel St', time: '12:23', lat: -33.907153, lng: 151.164366 },
      { name: 'Victoria Rd after Sydenham Rd', time: '12:25', lat: -33.910117, lng: 151.161971 },
      { name: 'Victoria Rd before Marrickville Rd', time: '12:26', lat: -33.911868, lng: 151.160565 },
      { name: 'Marrickville Rd at Gladstone St', time: '12:27', lat: -33.911496, lng: 151.158234 },
      { name: 'Marrickville Rd before Illawarra Rd', time: '12:28', lat: -33.910798, lng: 151.156763 },
      { name: 'Marrickville Rd opp Marrickville Town Hall', time: '12:29', lat: -33.90947, lng: 151.153942 },
      { name: 'Marrickville Rd opp Marrickville Library', time: '12:29', lat: -33.908975, lng: 151.152849 },
      { name: 'Marrickville Rd at Robert St', time: '12:30', lat: -33.90792, lng: 151.149685 },
      { name: 'Marrickville Rd at Darley St', time: '12:31', lat: -33.906981, lng: 151.146538 },
      { name: 'Marrickville Rd opp Fairfowl St', time: '12:32', lat: -33.905072, lng: 151.14409 },
      { name: 'Dulwich Hill Shops — last stop', time: '12:33', lat: -33.903688, lng: 151.14264, last: true },
    ],
  },
  '428': {
    id: '428', line: '428', headsign: 'Canterbury via Enmore Rd',
    stops: [
      { name: 'Newtown Station — you are here', time: '12:14', lat: -33.897448, lng: 151.17902, current: true },
      { name: 'Enmore Theatre', time: '12:16', lat: -33.898789, lng: 151.174817 },
      { name: 'Enmore Rd at Edgeware Rd', time: '12:17', lat: -33.899346, lng: 151.171409 },
      { name: 'Enmore Rd opp Newington Rd', time: '12:18', lat: -33.902369, lng: 151.169406 },
      { name: 'Enmore Park', time: '12:19', lat: -33.90359, lng: 151.168752 },
      { name: 'Addison Rd at Denby St', time: '12:20', lat: -33.903499, lng: 151.166381 },
      { name: 'Addison Road Community Centre', time: '12:21', lat: -33.902021, lng: 151.162646 },
      { name: 'Addison Rd at Neville St', time: '12:22', lat: -33.900505, lng: 151.159007 },
      { name: 'Addison Rd opp Shaw St', time: '12:23', lat: -33.89967, lng: 151.155703 },
      { name: 'Livingstone Rd at Morgan St', time: '12:24', lat: -33.899079, lng: 151.15347 },
      { name: 'Livingstone Rd before New Canterbury Rd', time: '12:25', lat: -33.896874, lng: 151.152866 },
      { name: 'New Canterbury Rd before Wardell Rd', time: '12:26', lat: -33.897084, lng: 151.14984 },
      { name: 'New Canterbury Rd opp Lewisham Public School', time: '12:27', lat: -33.89813, lng: 151.146606 },
      { name: 'New Canterbury Rd at Morton Ave', time: '12:28', lat: -33.899812, lng: 151.14511 },
      { name: 'Dulwich Hill Shops', time: '12:29', lat: -33.903147, lng: 151.142916 },
      { name: 'Dulwich Grove Light Rail', time: '12:30', lat: -33.905008, lng: 151.138219 },
      { name: 'New Canterbury Rd at Myra Rd', time: '12:31', lat: -33.905808, lng: 151.136151 },
      { name: 'New Canterbury Rd at Duntroon St', time: '12:31', lat: -33.905435, lng: 151.133561 },
      { name: 'New Canterbury Rd before Canterbury Rd', time: '12:33', lat: -33.904908, lng: 151.129127 },
      { name: 'Canterbury-Hurlstone Park RSL Club', time: '12:33', lat: -33.905936, lng: 151.127491 },
      { name: 'Canterbury Rd at Dunkeld Ave', time: '12:34', lat: -33.908118, lng: 151.125305 },
      { name: 'Canterbury Rd at Church St', time: '12:35', lat: -33.909664, lng: 151.123013 },
      { name: 'Canterbury Station — last stop', time: '12:36', lat: -33.911839, lng: 151.118882, last: true },
    ],
  },
  'T2': {
    id: 'T2', line: 'T2', headsign: 'City Circle via Town Hall', mode: 'train',
    stops: [
      { name: 'Newtown — you are here', time: '12:07', lat: -33.897879, lng: 151.179851, current: true },
      { name: 'Macdonaldtown', time: '12:08', lat: -33.89691, lng: 151.185811 },
      { name: 'Redfern', time: '12:11', lat: -33.892112, lng: 151.19839 },
      { name: 'Central', time: '12:14', lat: -33.884001, lng: 151.206893 },
      { name: 'Town Hall', time: '12:18', lat: -33.873616, lng: 151.206772 },
      { name: 'Wynyard', time: '12:21', lat: -33.865881, lng: 151.205852 },
      { name: 'Circular Quay — last stop', time: '12:23', lat: -33.86126, lng: 151.210312, last: true },
    ],
  },
  'T3': {
    id: 'T3', line: 'T3', headsign: 'Liverpool via Regents Park', mode: 'train',
    stops: [
      { name: 'Newtown — you are here', time: '12:23', lat: -33.897942, lng: 151.179854, current: true },
      { name: 'Stanmore', time: '', lat: -33.894631, lng: 151.164037 },
      { name: 'Petersham', time: '', lat: -33.893899, lng: 151.155574 },
      { name: 'Lewisham', time: '', lat: -33.89338, lng: 151.147467 },
      { name: 'Summer Hill', time: '', lat: -33.890433, lng: 151.138919 },
      { name: 'Ashfield', time: '12:30', lat: -33.887713, lng: 151.125498 },
      { name: 'Croydon', time: '', lat: -33.883296, lng: 151.115325 },
      { name: 'Burwood', time: '12:35', lat: -33.877352, lng: 151.104193 },
      { name: 'Strathfield', time: '12:38', lat: -33.871689, lng: 151.09379 },
      { name: 'Homebush', time: '12:40', lat: -33.867061, lng: 151.086342 },
      { name: 'Flemington', time: '', lat: -33.864975, lng: 151.069911 },
      { name: 'Lidcombe', time: '12:45', lat: -33.863836, lng: 151.044885 },
      { name: 'Berala', time: '12:48', lat: -33.871895, lng: 151.032433 },
      { name: 'Regents Park', time: '12:51', lat: -33.883096, lng: 151.024145 },
      { name: 'Sefton', time: '12:53', lat: -33.885293, lng: 151.01151 },
      { name: 'Chester Hill', time: '12:55', lat: -33.883643, lng: 150.999916 },
      { name: 'Leightonfield', time: '12:58', lat: -33.881549, lng: 150.985028 },
      { name: 'Villawood', time: '13:00', lat: -33.880874, lng: 150.976645 },
      { name: 'Carramar', time: '13:05', lat: -33.8845, lng: 150.960899 },
      { name: 'Cabramatta', time: '13:08', lat: -33.894911, lng: 150.938884 },
      { name: 'Warwick Farm', time: '13:11', lat: -33.913178, lng: 150.935165 },
      { name: 'Liverpool — last stop', time: '13:14', lat: -33.92479, lng: 150.927387, last: true },
    ],
  },
  'T4': {
    id: 'T4', line: 'T4', headsign: 'Bondi Junction via Central', mode: 'train',
    stops: [
      { name: 'Central — you are here', time: '12:09', lat: -33.885155, lng: 151.206874, current: true },
      { name: 'Town Hall', time: '12:12', lat: -33.87372, lng: 151.206896 },
      { name: 'Martin Place', time: '12:14', lat: -33.867803, lng: 151.211822 },
      { name: 'Kings Cross', time: '12:16', lat: -33.874254, lng: 151.221828 },
      { name: 'Edgecliff', time: '12:19', lat: -33.879282, lng: 151.236497 },
      { name: 'Bondi Junction — last stop', time: '12:22', lat: -33.891274, lng: 151.24824, last: true },
    ],
  },
  'T8': {
    id: 'T8', line: 'T8', headsign: 'City Circle via Airport', mode: 'train',
    stops: [
      { name: 'Wolli Creek — you are here', time: '12:00', lat: -33.928514, lng: 151.154285, current: true },
      { name: 'International Airport', time: '12:03', lat: -33.934927, lng: 151.165806 },
      { name: 'Domestic Airport', time: '12:05', lat: -33.933605, lng: 151.180864 },
      { name: 'Mascot', time: '12:08', lat: -33.923162, lng: 151.187227 },
      { name: 'Green Square', time: '12:12', lat: -33.906053, lng: 151.202532 },
      { name: 'Central — last stop', time: '12:16', lat: -33.884179, lng: 151.207215, last: true },
    ],
  },
  'M1': {
    id: 'M1', line: 'M1', headsign: 'Tallawong', mode: 'metro',
    stops: [
      { name: 'Sydenham — you are here', time: '12:03', lat: -33.913707, lng: 151.167192, current: true },
      { name: 'Waterloo', time: '12:06', lat: -33.897528, lng: 151.200212 },
      { name: 'Central', time: '12:09', lat: -33.884117, lng: 151.206381 },
      { name: 'Gadigal', time: '12:11', lat: -33.873814, lng: 151.208121 },
      { name: 'Martin Place', time: '12:12', lat: -33.867083, lng: 151.209982 },
      { name: 'Barangaroo', time: '12:15', lat: -33.859309, lng: 151.202548 },
      { name: 'Victoria Cross', time: '12:18', lat: -33.836205, lng: 151.207375 },
      { name: 'Crows Nest', time: '12:20', lat: -33.825849, lng: 151.199299 },
      { name: 'Chatswood', time: '12:24', lat: -33.797473, lng: 151.18088 },
      { name: 'North Ryde', time: '12:29', lat: -33.794307, lng: 151.138023 },
      { name: 'Macquarie Park', time: '12:31', lat: -33.785066, lng: 151.128255 },
      { name: 'Macquarie University', time: '12:33', lat: -33.777652, lng: 151.118242 },
      { name: 'Epping', time: '12:37', lat: -33.772957, lng: 151.082002 },
      { name: 'Cherrybrook', time: '12:43', lat: -33.736792, lng: 151.032055 },
      { name: 'Castle Hill', time: '12:45', lat: -33.731549, lng: 151.007706 },
      { name: 'Hills Showground', time: '12:48', lat: -33.727817, lng: 150.987462 },
      { name: 'Norwest', time: '12:51', lat: -33.734334, lng: 150.963918 },
      { name: 'Bella Vista', time: '12:53', lat: -33.730719, lng: 150.944037 },
      { name: 'Kellyville', time: '12:56', lat: -33.713519, lng: 150.935227 },
      { name: 'Rouse Hill', time: '12:59', lat: -33.692016, lng: 150.924263 },
      { name: 'Tallawong — last stop', time: '13:01', lat: -33.691705, lng: 150.905653, last: true },
    ],
  },
};

// Pins placed on real Newtown coordinates for the OpenStreetMap layer.
export const mapPoints: MapPoint[] = [
  { id: 'mp-makers', kind: 'event', label: 'Makers Market', lat: -33.8963, lng: 151.1768, target: { screen: 'eventDetail', id: 'makers-market' } },
  { id: 'mp-yard', kind: 'event', label: 'Open-mic · The Yard', lat: -33.8956, lng: 151.1801, target: { screen: 'eventDetail', id: 'open-mic-yard' } },
  { id: 'mp-garden', kind: 'event', label: 'Garden working bee', lat: -33.8999, lng: 151.1809, target: { screen: 'eventDetail', id: 'garden-bee' } },
  { id: 'mp-market-hall', kind: 'event', label: 'Community lunch', lat: -33.8991, lng: 151.1785, target: { screen: 'events' } },
  { id: 'mp-library-read', kind: 'event', label: 'Storytime · Library', lat: -33.8978, lng: 151.1751, target: { screen: 'events' } },
  { id: 'mp-film', kind: 'event', label: 'Outdoor film night', lat: -33.8952, lng: 151.1779, target: { screen: 'events' } },

  { id: 'mp-basketball', kind: 'request', label: 'Sat basketball', lat: -33.9068, lng: 151.1732, target: { screen: 'requestDetail', id: 'sat-basketball' } },
  { id: 'mp-run', kind: 'request', label: 'Sunday run', lat: -33.9041, lng: 151.1712, target: { screen: 'requestDetail', id: 'sunday-run' } },
  { id: 'mp-jam', kind: 'request', label: 'Garage jam', lat: -33.8989, lng: 151.1796, target: { screen: 'requestDetail', id: 'garage-jam' } },
  { id: 'mp-chess', kind: 'request', label: 'Park chess', lat: -33.8969, lng: 151.1773, target: { screen: 'requestDetail', id: 'park-chess' } },
  { id: 'mp-lift', kind: 'request', label: 'Lift to markets', lat: -33.8949, lng: 151.1815, target: { screen: 'requests' } },
  { id: 'mp-cook', kind: 'request', label: 'Shared cooking', lat: -33.9012, lng: 151.1762, target: { screen: 'requests' } },

  { id: 'mp-stop-b', kind: 'stop', label: 'King St · Stop B', lat: -33.8975, lng: 151.179, target: { screen: 'transport' } },
  { id: 'mp-station', kind: 'stop', label: 'Newtown Station', lat: -33.8983, lng: 151.1793, target: { screen: 'transport' } },
  { id: 'mp-sydenham', kind: 'stop', label: 'Sydenham · M1', lat: -33.911, lng: 151.1668, target: { screen: 'transport' } },
  { id: 'mp-stanmore', kind: 'stop', label: 'Stanmore Station', lat: -33.8935, lng: 151.1651, target: { screen: 'transport' } },
  { id: 'mp-enmore', kind: 'stop', label: 'Enmore Rd · Stop C', lat: -33.9013, lng: 151.1735, target: { screen: 'transport' } },

  { id: 'mp-camperdown', kind: 'park', label: 'Camperdown park', lat: -33.8967, lng: 151.1772 },
  { id: 'mp-wilson', kind: 'park', label: 'Wilson St gardens', lat: -33.9001, lng: 151.1808 },
  { id: 'mp-hollis', kind: 'park', label: 'Hollis Park', lat: -33.8961, lng: 151.1743 },
  { id: 'mp-toilets-king', kind: 'park', label: 'Toilets · King St', lat: -33.8985, lng: 151.1778 },
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

// WMO weather codes → glanceable icon + word. Grouped, not exhaustive.
// https://open-meteo.com/en/docs (weather_code)
function describeWeather(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: '☀️', label: 'Clear' };
  if (code <= 2) return { icon: '🌤️', label: 'Partly sunny' };
  if (code === 3) return { icon: '☁️', label: 'Cloudy' };
  if (code <= 48) return { icon: '🌫️', label: 'Fog' };
  if (code <= 57) return { icon: '🌦️', label: 'Drizzle' };
  if (code <= 67) return { icon: '🌧️', label: 'Rain' };
  if (code <= 77) return { icon: '🌨️', label: 'Snow' };
  if (code <= 82) return { icon: '🌧️', label: 'Showers' };
  if (code <= 86) return { icon: '🌨️', label: 'Snow showers' };
  return { icon: '⛈️', label: 'Storm' }; // 95–99
}

export interface Weather {
  tempC: number;
  icon: string;
  label: string;
}

/** Live Newtown weather from Open-Meteo (no API key). Fetches once, then hourly.
 *  Returns null until the first response lands. */
export function useWeather(): Weather | null {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${mapCenter.lat}&longitude=${mapCenter.lng}` +
      `&current=temperature_2m,weather_code&timezone=Australia/Sydney`;
    const load = () =>
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          const c = d?.current;
          if (typeof c?.temperature_2m !== 'number') return;
          setWeather({ tempC: Math.round(c.temperature_2m), ...describeWeather(c.weather_code) });
        })
        .catch(() => {}); // ponytail: kiosk keeps its last value on a flaky network
    load();
    const id = setInterval(load, 3600000);
    return () => clearInterval(id);
  }, []);
  return weather;
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
