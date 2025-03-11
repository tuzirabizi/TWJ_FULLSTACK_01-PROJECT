# AI Dataset Generator Backend

## Database Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=ai_dataset_generator
```

3. Initialize the database:
```bash
npm run init:db
```

4. Run database migrations:
```bash
npm run migration:run
```

## Development

1. Start the development server:
```bash
npm run start:dev
```

2. The API will be available at `http://localhost:3000`

## Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start the application in watch mode
- `npm run start:debug` - Start the application in debug mode
- `npm run start:prod` - Start the application in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run init:db` - Initialize the database
- `npm run migration:run` - Run database migrations
- `npm run migration:revert` - Revert the last migration

## Database Schema

### Users
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `first_name` (String)
- `last_name` (String)
- `role` (Enum: admin, user, guest)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Datasets
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `user_id` (UUID, Foreign Key)
- `type` (Enum: text, image, audio)
- `format` (Enum: csv, json, xml)
- `status` (Enum: pending, generating, completed, failed)
- `config` (JSON)
- `metadata` (JSON)
- `progress` (Float)
- `download_url` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Generation Jobs
- `id` (UUID, Primary Key)
- `dataset_id` (UUID, Foreign Key)
- `model_config` (JSON)
- `status` (Enum: queued, processing, completed, failed)
- `progress` (Float)
- `error` (Text)
- `logs` (JSON)
- `created_at` (Timestamp)
- `updated_at` (Timestamp) 