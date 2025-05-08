# Better Ending Backend

A professional backend service for the Better Ending application.

## Features

- GraphQL API with Apollo Server
- Authentication with JWT
- Redis caching
- Queue processing with BullMQ
- PostgreSQL database with Sequelize ORM
- TypeScript support
- Comprehensive testing setup

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Redis
- Yarn package manager

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=better_ending
DB_USER=your_username
DB_PASSWORD=your_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:gbyonivo/better-ending-be.git
   cd better-ending-be
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up the database:

   ```bash
   yarn db:migrate
   ```

4. Start the development server:
   ```bash
   yarn start
   ```

## Development

- Run tests: `yarn test`
- Lint code: `yarn lint`
- Fix linting issues: `yarn lint:fix`

## API Documentation

The GraphQL API is available at `http://localhost:4000/graphql` when running in development mode.

### Main Queries

- `getUser`: Fetch user details
- `getStories`: Fetch user stories
- `getStory`: Fetch a specific story

### Main Mutations

- `createUser`: Create a new user
- `createStory`: Create a new story
- `updateStory`: Update an existing story
- `deleteStory`: Delete a story

## Testing

The project uses Jest for testing. Tests are located in the `__tests__` directories alongside the source files.

Run tests with:

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
