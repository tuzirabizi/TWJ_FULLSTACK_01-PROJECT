import { z } from 'zod';
import { DatasetType } from './dataset';

export enum ModelType {
  GPT3 = 'gpt3',
  GPT4 = 'gpt4',
  STABLE_DIFFUSION = 'stable-diffusion',
  DALL_E = 'dall-e',
  WAVENET = 'wavenet',
}

export const AIModelConfigSchema = z.object({
  type: z.nativeEnum(ModelType),
  parameters: z.record(z.string(), z.any()),
  datasetType: z.nativeEnum(DatasetType),
});

export const GenerationJobSchema = z.object({
  id: z.string().uuid(),
  datasetId: z.string().uuid(),
  modelConfig: AIModelConfigSchema,
  status: z.enum(['queued', 'processing', 'completed', 'failed']),
  progress: z.number().min(0).max(100),
  error: z.string().optional(),
  logs: z.array(z.object({
    timestamp: z.date(),
    message: z.string(),
    level: z.enum(['info', 'warning', 'error']),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GenerationRequestSchema = z.object({
  datasetId: z.string().uuid(),
  modelConfig: AIModelConfigSchema,
});

export type AIModelConfig = z.infer<typeof AIModelConfigSchema>;
export type GenerationJob = z.infer<typeof GenerationJobSchema>;
export type GenerationRequest = z.infer<typeof GenerationRequestSchema>; 