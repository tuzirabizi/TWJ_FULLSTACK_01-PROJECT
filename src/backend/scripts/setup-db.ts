import { Client } from 'pg';
import { AppDataSource } from '../src/config/data-source';
import * as dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  // First, create the database if it doesn't exist
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  try {
    await client.connect();
    
    const dbName = process.env.DB_NAME || 'ai_dataset_generator';
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`Creating database: ${dbName}`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log('Database created successfully');
    } else {
      console.log(`Database ${dbName} already exists`);
    }

    await client.end();

    // Initialize TypeORM connection and run migrations
    console.log('Initializing database connection...');
    const dataSource = await AppDataSource.initialize();
    
    // Drop all tables and types
    console.log('Dropping existing tables and types...');
    await dataSource.query(`
      DROP TABLE IF EXISTS generation_jobs CASCADE;
      DROP TABLE IF EXISTS datasets CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TYPE IF EXISTS job_status CASCADE;
      DROP TYPE IF EXISTS dataset_status CASCADE;
      DROP TYPE IF EXISTS dataset_format CASCADE;
      DROP TYPE IF EXISTS dataset_type CASCADE;
      DROP TYPE IF EXISTS user_role CASCADE;
    `);
    console.log('Existing tables and types dropped successfully');
    
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('Migrations completed successfully');

    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 