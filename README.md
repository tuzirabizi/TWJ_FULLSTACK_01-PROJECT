# AI Dataset Generator

A comprehensive web application for generating AI datasets with advanced features for data generation, management, and customization.

## Features

### Backend
- User authentication with JWT
- Role-based access control (Admin, User, Guest)
- Dataset management with versioning
- Queue-based dataset generation
- API access with rate limiting
- Admin dashboard with analytics
- Secure data handling and encryption
- Real-time job status updates

### Frontend
- Modern, responsive UI
- User-friendly dataset configuration
- Real-time progress monitoring
- Dataset preview and export
- User feedback system
- Mobile-friendly design

### AI Integration
- Multiple AI model support (Text, Image, Audio)
- Data augmentation capabilities
- Progress tracking
- Model fine-tuning based on feedback

## Project Structure
```
src/
├── backend/           # Node.js + Express backend
├── frontend/         # React + TypeScript frontend
├── ai-service/       # AI integration service
└── shared/          # Shared types and utilities
```

## Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6
- Python >= 3.8 (for AI services)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-dataset-generator.git
cd ai-dataset-generator
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development servers:
```bash
npm start
```

## Development

- Backend: `npm run start:backend`
- Frontend: `npm run start:frontend`
- AI Service: `npm run start:ai-service`

## Testing

Run all tests:
```bash
npm test
```

Or test individual components:
- Backend: `npm run test:backend`
- Frontend: `npm run test:frontend`
- AI Service: `npm run test:ai-service`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 