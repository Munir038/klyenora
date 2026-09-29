import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { getDatabase } from '../../db/mongo.js';

export const login = async ({ email, password }) => {
  const user = await getDatabase().collection('users').findOne({ email: email.toLowerCase() });
  const passwordMatches = user && await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  return {
    user: { id: user._id.toString(), name: user.fullName, email: user.email, phone: user.phone, role: user.role },
    token,
  };
};
