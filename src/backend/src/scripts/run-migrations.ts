import { AppDataSource } from '../config/data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Running migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully');
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error('Error during migration:', error);
    process.exit(1);
  }); 