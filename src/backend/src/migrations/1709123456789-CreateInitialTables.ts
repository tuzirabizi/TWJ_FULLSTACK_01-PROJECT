import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1709123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');

      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        role user_role NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create datasets table
    await queryRunner.query(`
      CREATE TYPE dataset_type AS ENUM ('text', 'image', 'audio');
      CREATE TYPE dataset_format AS ENUM ('csv', 'json', 'xml');
      CREATE TYPE dataset_status AS ENUM ('pending', 'generating', 'completed', 'failed');

      CREATE TABLE datasets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type dataset_type NOT NULL,
        format dataset_format NOT NULL,
        status dataset_status NOT NULL DEFAULT 'pending',
        config JSONB NOT NULL DEFAULT '{}',
        metadata JSONB NOT NULL DEFAULT '{}',
        progress FLOAT NOT NULL DEFAULT 0,
        download_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create generation_jobs table
    await queryRunner.query(`
      CREATE TYPE job_status AS ENUM ('queued', 'processing', 'completed', 'failed');

      CREATE TABLE generation_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
        model_config JSONB NOT NULL DEFAULT '{}',
        status job_status NOT NULL DEFAULT 'queued',
        progress FLOAT NOT NULL DEFAULT 0,
        error TEXT,
        logs JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX idx_datasets_user_id ON datasets(user_id);
      CREATE INDEX idx_generation_jobs_dataset_id ON generation_jobs(dataset_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS generation_jobs;
      DROP TABLE IF EXISTS datasets;
      DROP TABLE IF EXISTS users;
      DROP TYPE IF EXISTS job_status;
      DROP TYPE IF EXISTS dataset_status;
      DROP TYPE IF EXISTS dataset_format;
      DROP TYPE IF EXISTS dataset_type;
      DROP TYPE IF EXISTS user_role;
    `);
  }
} 