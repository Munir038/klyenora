import { Router } from 'express';
import { z } from 'zod';
import { login } from './auth.service.js';

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(6).max(128),
});

export const authRouter = Router();

authRouter.post('/login', async (request, response, next) => {
  try {
    const credentials = loginSchema.parse(request.body);
    const data = await login(credentials);
    response.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.statusCode = 400;
      error.message = error.issues[0]?.message ?? 'Invalid login request.';
    }
    next(error);
  }
});
