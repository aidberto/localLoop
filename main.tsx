import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { KioskApp, demo } from './index';
import { PhoneApp } from './app';
import { PHONE_SCREEN_IDS, type PhoneScreenId } from './app/types';
import { bbqRequest, newId } from './data';

/** A QR deep-link (`/?phone=<screen>&id=<id>`) switches the kiosk SPA into the
 *  phone view. Validate the screen param (untrusted URL input); fall back to the
 *  splash/onboarding flow on anything unknown. */
function resolvePhoneScreen(value: string | null): PhoneScreenId {
  return (PHONE_SCREEN_IDS as readonly string[]).includes(value ?? '')
    ? (value as PhoneScreenId)
    : 'splash';
}

if (import.meta.env.DEV) {
  demo();
  console.assert(resolvePhoneScreen('bogus') === 'splash', 'bad screen → splash');
  console.assert(resolvePhoneScreen('map') === 'map', 'good screen passes through');
  console.assert(resolvePhoneScreen(null) === 'splash', 'missing screen → splash');
  console.assert(resolvePhoneScreen('newRequest') === 'newRequest', 'QR deep-link opens the new-request form');
  console.assert(bbqRequest.category === 'FOOD', 'BBQ shows under the kiosk Food filter');
  console.assert(newId('req') !== newId('req'), 'newId produces distinct ids');
}

const params = new URLSearchParams(window.location.search);
const phoneParam = params.get('phone');
const root = document.getElementById('root')!;

const app = phoneParam ? (
  <div style={{ height: '100svh' }}>
    <PhoneApp
      initialScreen={resolvePhoneScreen(phoneParam)}
      initialSelectedId={params.get('id') ?? undefined}
    />
  </div>
) : (
  <KioskApp initialScreen="home" />
);

createRoot(root).render(<StrictMode>{app}</StrictMode>);
