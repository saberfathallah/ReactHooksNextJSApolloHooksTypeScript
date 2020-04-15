import express from 'express';
import next from 'next';

const port = 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.set('x-powered-by', false);


    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`🚀 Ready on http://localhost:${port}`);
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
})();
