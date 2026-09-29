import { app } from './app.js';
import { env } from './config/env.js';
import { closeDatabase, connectDatabase } from './db/mongo.js';

await connectDatabase();
const server = app.listen(env.PORT, () => console.log(`Klyenora API listening on port ${env.PORT}`));

const shutdown = async () => {
  server.close();
  await closeDatabase();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
