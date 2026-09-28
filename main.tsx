import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { KioskApp, demo } from './index';

if (import.meta.env.DEV) demo();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KioskApp initialScreen="home" />
  </StrictMode>,
);
