import bcrypt from 'bcryptjs';
import { closeDatabase, connectDatabase, getDatabase } from '../db/mongo.js';

const [fullName, email, password] = process.argv.slice(2);
if (!fullName || !email || !password) {
  console.error('Usage: npm run db:create-user -- "Full Name" email@example.com password');
  process.exit(1);
}

try {
  const passwordHash = await bcrypt.hash(password, 12);
  await connectDatabase();
  await getDatabase().collection('users').updateOne(
    { email: email.toLowerCase() },
    { $set: { fullName, passwordHash, updatedAt: new Date() }, $setOnInsert: { email: email.toLowerCase(), role: 'owner', createdAt: new Date() } },
    { upsert: true },
  );
  console.log(`Created user ${email}`);
} finally {
  await closeDatabase();
}
