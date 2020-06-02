import express from 'express';
import next from 'next';
import compression from 'compression';

const port = 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(compression());

    server.set('x-powered-by', false);

    server.get("/nginx_status", (_, res) => res.status(200).send("OK"));

    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`🚀 Ready on http://localhost:${port}`);
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
})();
