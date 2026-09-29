import { closeDatabase, connectDatabase, getDatabase } from '../db/mongo.js';

try {
  await connectDatabase();
  await getDatabase().collection('users').createIndex({ email: 1 }, { unique: true });
  console.log('MongoDB indexes created.');
} finally {
  await closeDatabase();
}
