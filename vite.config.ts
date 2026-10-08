import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getDepartures } from './api/departures';
import { handleBoard } from './api/board';

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

// Serves /api/board under plain `vite dev`, reusing the same handleBoard core as
// the Vercel function. Needs KV_REST_API_* in .env.local (see api/board.ts).
function boardDevApi(): Plugin {
  return {
    name: 'board-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/board', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
          const url = new URL(req.url ?? '', 'http://localhost');
          let item: any;
          if (req.method === 'POST') {
            const chunks: Buffer[] = [];
            for await (const c of req) chunks.push(c as Buffer);
            item = JSON.parse(Buffer.concat(chunks).toString() || '{}');
          }
          const { status, body } = await handleBoard({
            method: req.method ?? 'GET',
            type: url.searchParams.get('type') ?? undefined,
            id: url.searchParams.get('id') ?? undefined,
            item,
          });
          res.statusCode = status;
          res.end(JSON.stringify(body));
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
  // The board API (api/board.ts) reads KV creds from process.env on first command;
  // loadEnv only populates import.meta.env, so bridge them for the dev middleware.
  if (env.STORAGE_KV_REST_API_URL) process.env.STORAGE_KV_REST_API_URL = env.STORAGE_KV_REST_API_URL;
  if (env.STORAGE_KV_REST_API_TOKEN) process.env.STORAGE_KV_REST_API_TOKEN = env.STORAGE_KV_REST_API_TOKEN;
  return { plugins: [react(), departuresDevApi(env.TFNSW_API_KEY), boardDevApi()] };
});
