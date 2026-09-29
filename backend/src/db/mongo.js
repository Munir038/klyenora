import { MongoClient } from 'mongodb';
import { env } from '../config/env.js';

const client = new MongoClient(env.MONGODB_URI);
let database;

export const connectDatabase = async () => {
  await client.connect();
  database = client.db(env.MONGODB_DATABASE);
};

export const getDatabase = () => {
  if (!database) throw new Error('Database connection has not been established.');
  return database;
};

export const closeDatabase = () => client.close();
