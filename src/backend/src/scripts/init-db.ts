import { Client } from 'pg';

async function initializeDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  try {
    await client.connect();
    
    // Create database if it doesn't exist
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
  } catch (error: any) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initializeDatabase()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  }); 