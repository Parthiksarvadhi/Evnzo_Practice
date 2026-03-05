import type { Request, Response } from 'express';
import { RES_STATUS, RES_TYPES } from '@constant/message.constant';
import { handleApiResponse } from '@utils/handleResponse';
import { prisma } from '@db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError({ message: 'Email and password are required', errorType: ERROR_TYPES.INVALID_REQUEST });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError({ message: 'Invalid credentials', errorType: ERROR_TYPES.UNAUTHORIZED });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError({ message: 'Invalid credentials', errorType: ERROR_TYPES.UNAUTHORIZED });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET || 'supersecret',
    { expiresIn: '1d' }
  );

  return handleApiResponse(res, {
    responseType: RES_STATUS.GET,
    message: RES_TYPES.SUCCESS,
    data: {
      token,
      user: {
        id: String(user.id),
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  });
};

export const refreshTokenController = async (_req: Request, res: Response) => {
  // TODO: Implement refresh token logic
  return handleApiResponse(res, {
    responseType: RES_STATUS.GET,
    message: RES_TYPES.SUCCESS,
    data: {
      todo: 'Implement refresh token logic'
    }
  });
};

