import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getDepartures } from './api/departures';

// Serves /api/departures under plain `vite dev` (prod uses the Vercel function).
function departuresDevApi(key: string): Plugin {
  return {
    name: 'departures-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/departures', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
          if (!key) throw new Error('TFNSW_API_KEY not set in .env.local');
          res.end(JSON.stringify(await getDepartures(key)));
        } catch (err: any) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: String(err?.message ?? err) }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return { plugins: [react(), departuresDevApi(env.TFNSW_API_KEY)] };
});
