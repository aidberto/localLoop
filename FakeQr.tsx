import type { ReactElement } from 'react';

/** Placeholder QR - deterministic noise field with real finder patterns.
 *  ponytail: fake for mid-fi; swap for a real QR lib before it means anything. */
const N = 25; // modules per side

// seeded PRNG so a given seed always draws the same "code" (no flicker on re-render)
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 8×8 reserved corner (7 finder + 1 separator) at top-left, top-right, bottom-left
function inFinderZone(r: number, c: number) {
  const z = (br: number, bc: number) => r >= br && r < br + 8 && c >= bc && c < bc + 8;
  return z(0, 0) || z(0, N - 8) || z(N - 8, 0);
}

// dark modules of a 7×7 finder: outer ring + centre 3×3
function isFinderDark(r: number, c: number) {
  const local = (br: number, bc: number) => {
    const lr = r - br;
    const lc = c - bc;
    if (lr < 0 || lr > 6 || lc < 0 || lc > 6) return false;
    const ring = lr === 0 || lr === 6 || lc === 0 || lc === 6;
    const centre = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
    return ring || centre;
  };
  return local(0, 0) || local(0, N - 7) || local(N - 7, 0);
}

export default function FakeQr({ color = '#2B2723', seed = 7 }: { color?: string; seed?: number }) {
  const rand = mulberry32(seed);
  const rects: ReactElement[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const dark = inFinderZone(r, c) ? isFinderDark(r, c) : rand() > 0.55;
      if (dark) rects.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} />);
    }
  }
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      fill={color}
      shapeRendering="crispEdges"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="QR code"
    >
      {rects}
    </svg>
  );
}
