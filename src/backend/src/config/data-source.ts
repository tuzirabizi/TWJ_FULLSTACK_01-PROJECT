import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Dataset } from '../models/Dataset';
import { GenerationJob } from '../models/GenerationJob';
import { CreateInitialTables1709123456789 } from '../migrations/1709123456789-CreateInitialTables';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ai_dataset_generator',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Dataset, GenerationJob],
  migrations: [CreateInitialTables1709123456789],
  subscribers: [],
});