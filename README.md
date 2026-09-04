# LocalLoop kiosk — React screens

Eight kiosk screens converted from the mid-fi mockups. React + TypeScript, CSS Modules,
no runtime dependencies beyond React.

    react/
      KioskApp.tsx          screen state + navigation
      KioskShell.tsx        shared header (logo, suburb, register, time, temp)
      theme.css             global tokens, Nunito import, the --u scale unit
      types.ts              ScreenId, KioskScreenProps, KioskShellProps
      index.ts              barrel export
      screens/
        HomeScreen.tsx          1b  live tiles
        EventsScreen.tsx        1d  events list + filters
        EventDetailScreen.tsx   1e
        TransportScreen.tsx     1f  live departures
        BusDetailScreen.tsx     1g  stops + live position
        RequestsScreen.tsx      1h  community board
        RequestDetailScreen.tsx 1i
        MapScreen.tsx           1j  full-bleed map
      screens/*.module.css  one stylesheet per screen

## Use

    import { KioskApp } from './react';

    <KioskApp initialScreen="home" />

Or mount a single screen and handle navigation yourself:

    <EventsScreen onNavigate={(id) => router.push(id)} />

## Sizing

The design is authored at 1920x1080. Every dimension is written as
`calc(var(--u) * n)`, where `theme.css` sets `--u: calc(100vw / 1920)`, so
layouts scale fluidly with viewport width and keep the intended proportions.
The unit is clamped above 2400px and below 1000px. Screens are
`min-height: 100svh`.

## Navigation

Wired hotspots: header logo → home, home tiles → their section, the persistent
bottom nav pills, back pills on detail screens, and the first list card → its
detail screen. Everything else is presentational `div`s, so add handlers where
you need them.

## Still placeholders

Map tiles and event photos are hatched placeholders (`.mapPlaceholder`,
`.photo*`). Swap them for real tiles/imagery before user testing.
