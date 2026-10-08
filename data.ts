/* LocalLoop - client data layer. Re-exports the pure seed data/types from
   seed.ts (so existing `import { events } from './data'` paths keep working) and
   adds the live board (events + requests) fetched from /api/board, plus the
   React hooks for the clock and weather. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { events as seedEvents, requests as seedRequests, mapCenter } from './seed';
import type { EventItem, RequestItem } from './seed';

export * from './seed';

// ---------------------------------------------------------------------------
// Live board: events + requests, backed by the KV store behind /api/board.
// ---------------------------------------------------------------------------

export interface Board {
  events: EventItem[];
  requests: RequestItem[];
}

/** Full board snapshot. Returns null on any failure so callers keep the seed. */
export async function fetchBoard(): Promise<Board | null> {
  try {
    const r = await fetch('/api/board');
    if (!r.ok) return null;
    return (await r.json()) as Board;
  } catch {
    return null;
  }
}

type BoardType = 'event' | 'request';

async function postItem(type: BoardType, item: EventItem | RequestItem): Promise<boolean> {
  try {
    const r = await fetch(`/api/board?type=${type}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function deleteItem(type: BoardType, id: string): Promise<boolean> {
  try {
    const r = await fetch(`/api/board?type=${type}&id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    return r.ok;
  } catch {
    return false;
  }
}

/** Short unique id for a freshly created board item. */
export const newId = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export interface BoardApi extends Board {
  createEvent: (item: EventItem) => Promise<void>;
  createRequest: (item: RequestItem) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

/** Live board state. Seeds from the static data so the UI never flashes empty,
 *  then fetches and polls so kiosk and phone converge within `pollMs`.
 *  Mutations update local state optimistically, then persist + refresh. */
export function useBoard(pollMs = 15000): BoardApi {
  const [board, setBoard] = useState<Board>({ events: seedEvents, requests: seedRequests });

  const refresh = useCallback(async () => {
    const b = await fetchBoard();
    if (b) setBoard(b);
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [refresh, pollMs]);

  const createEvent = useCallback(async (item: EventItem) => {
    setBoard((b) => ({ ...b, events: [...b.events, item] }));
    await postItem('event', item);
    refresh();
  }, [refresh]);

  const createRequest = useCallback(async (item: RequestItem) => {
    setBoard((b) => ({ ...b, requests: [item, ...b.requests] }));
    await postItem('request', item);
    refresh();
  }, [refresh]);

  const deleteEvent = useCallback(async (id: string) => {
    setBoard((b) => ({ ...b, events: b.events.filter((e) => e.id !== id) }));
    await deleteItem('event', id);
    refresh();
  }, [refresh]);

  const deleteRequest = useCallback(async (id: string) => {
    setBoard((b) => ({ ...b, requests: b.requests.filter((r) => r.id !== id) }));
    await deleteItem('request', id);
    refresh();
  }, [refresh]);

  return { ...board, createEvent, createRequest, deleteEvent, deleteRequest, refresh };
}

// ---------------------------------------------------------------------------
// Live departures from the TfNSW proxy (see api/departures.ts).
// ---------------------------------------------------------------------------

/** Returns null on any failure so callers fall back to the static `departures`. */
export async function fetchDepartures(): Promise<import('./seed').Departure[] | null> {
  try {
    const r = await fetch('/api/departures');
    if (!r.ok) return null;
    const data = (await r.json()) as import('./seed').Departure[];
    return Array.isArray(data) && data.length ? data : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Clock + time formatting helpers.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Weather.
// ---------------------------------------------------------------------------

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

// Last fetched weather, cached at module scope so a KioskShell remount (screen
// change) starts from the known value instead of flashing back to "-°".
let cachedWeather: Weather | null = null;

/** Live Newtown weather from Open-Meteo (no API key). Fetches once, then hourly.
 *  Returns null until the first response lands. */
export function useWeather(): Weather | null {
  const [weather, setWeather] = useState<Weather | null>(cachedWeather);
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
          cachedWeather = { tempC: Math.round(c.temperature_2m), ...describeWeather(c.weather_code) };
          setWeather(cachedWeather);
        })
        .catch(() => {}); // ponytail: kiosk keeps its last value on a flaky network
    load();
    const id = setInterval(load, 3600000);
    return () => clearInterval(id);
  }, []);
  return weather;
}
