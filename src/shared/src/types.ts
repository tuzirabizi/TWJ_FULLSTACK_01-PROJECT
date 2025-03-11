export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export enum DatasetType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio'
}

export enum DatasetFormat {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml'
}

export enum DatasetStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum JobStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ModelType {
  GPT3 = 'gpt3',
  GPT4 = 'gpt4',
  STABLE_DIFFUSION = 'stable-diffusion',
  DALL_E = 'dall-e'
} 