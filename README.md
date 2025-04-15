# Better Ending Backend

A GraphQL API server built with Apollo Server, Express, and TypeScript, designed to provide backend services for the Better Ending application.

## 🚀 Technologies

- **Node.js & TypeScript**: Core runtime and language
- **Apollo Server**: GraphQL server implementation
- **Express**: Web server framework
- **PostgreSQL**: Primary database (via Sequelize ORM)
- **Redis**: Caching layer
- **OpenAI Integration**: AI capabilities
- **JWT**: Authentication handling

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL
- Redis
- Yarn package manager

## 🛠️ Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:gbyonivo/better-ending-be.git
   cd better-ending-be
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   # Database Configuration
   DATABASE_URL=your_database_url

   # Redis Configuration
   REDIS_URL=your_redis_url

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Server Configuration
   PORT=5001
   ```

4. Start the development server:
   ```bash
   yarn start
   ```

## 🏗️ Project Structure

```
src/
├── database/     # Database configuration and models
├── resolvers/    # GraphQL resolvers
├── schema/       # GraphQL schema definitions
├── services/     # Business logic and external service integrations
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── index.ts      # Application entry point
```

## 🔑 Features

- GraphQL API with Apollo Server
- PostgreSQL database integration with Sequelize ORM
- Redis caching layer
- OpenAI integration for AI features
- JWT-based authentication
- TypeScript for type safety
- Express middleware support

## 🚀 API Endpoints

- GraphQL Endpoint: `http://localhost:5001/`
- Health Check: `http://localhost:5001/test`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Orkuma Ivo
