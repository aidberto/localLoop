import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { KioskApp } from './index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KioskApp initialScreen="home" />
  </StrictMode>,
);
