import { z } from 'zod';
import { DatasetType, DatasetFormat, ModelType } from './types';

// Auth schemas
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

// Dataset schemas
export const CreateDatasetRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  config: z.object({
    type: z.nativeEnum(DatasetType),
    format: z.nativeEnum(DatasetFormat),
    size: z.number().int().min(1).max(1000),
    parameters: z.object({
      model: z.nativeEnum(ModelType).optional(),
      temperature: z.number().min(0).max(1).optional(),
      prompt: z.string().optional(),
    }).optional(),
  }),
});

// Types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type CreateDatasetRequest = z.infer<typeof CreateDatasetRequestSchema>; 