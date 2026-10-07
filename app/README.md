# LocalLoop companion app - React screens

Seventeen phone screens (2a–2q) converted from the mid-fi mockups. React + TypeScript,
CSS Modules, no runtime dependencies beyond React. Drops into the same project as the
kiosk screens in `react/` - shared `theme.css`, separate screen ids so nothing clashes.

    react/app/
      PhoneApp.tsx       screen state + navigation
      types.ts           PhoneScreenId, PhoneScreenProps
      index.ts           barrel export
      screens/
        PhoneSplashScreen         2a
        PhoneScanKioskScreen      2b  scan the kiosk QR
        PhoneNewMemberScreen      2c  form + inline validation
        PhoneConfirmationScreen   2d  application sent
        PhoneHomeScreen           2e  home menu
        PhoneEventsScreen         2i
        PhoneEventDetailScreen    2j
        PhoneNewEventScreen       2k
        PhoneMapScreen            2l
        PhoneTransportScreen      2m
        PhoneRouteDetailScreen    2n
        PhoneRequestsScreen       2o
        PhoneRequestDetailScreen  2p
        PhoneNewRequestScreen     2q
      screens/*.module.css  one stylesheet per screen

## Use

    import { PhoneApp } from './react/app';

    <PhoneApp initialScreen="home" />

Single screen, your own routing:

    <PhoneRequestsScreen onNavigate={(id) => router.push(id)} />

## Sizing

Authored at 390×844. Dimensions are `calc(var(--pu) * n)`; `theme.css` sets
`--pu: calc(min(100vw, 430px) / 390)`, so screens fill a phone viewport and stay
phone-sized on desktop. To render one inside an arbitrary-width container (a device
frame, a side-by-side gallery), add `className="llPhoneFrame"` to that container -
it re-bases `--pu` on container width via container queries.

Screens are `min-height: 100svh`, centred, `max-width: calc(var(--pu) * 390)`.
The mockups have no status bar, matching the frames.

## Navigation

Wired hotspots: header back pills (target inferred from the label), home menu rows →
their section, first list row → its detail screen, splash → scan QR, confirmation CTAs.
Everything else is presentational `div`s.

## Still placeholders

Map tiles, route maps and event photos are hatched placeholders (`.mapPlaceholder`).
