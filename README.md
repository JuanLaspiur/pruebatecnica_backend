# Backend API

## Description

This project is a backend API built with Node.js, Express, and TypeScript. It manages authentication, database operations, and API endpoints for a task management system.

## Technologies Used

- **Runtime**: Node.js (21.x)
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken) & bcryptjs
- **CORS Handling**: cors
- **Environment Variables**: dotenv
- **API Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Development Tools**: TypeScript, Nodemon, ts-node

## Installation

1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd backend_typescript-next
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and define the following variables:
   ```sh
   PORT=4000
   DB_URI= <uri-mongodb>
   JWT_SECRET=<secret-token>
   ```
## Documentation
-Swagger
```sh
http://localhost:4000/api-docs  
```

## Available Scripts

- `npm run dev`: Starts the development server with Nodemon.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run start`: Runs the compiled project.

## Project Structure

```
backend_typescript-next/
│-- dist/               # Compiled output
│-- node_modules/       # Dependencies
│-- src/
│   ├── config/        # Configuration files
│   ├── controllers/   # API controllers
│   ├── docs/          # API documentation
│   ├── helpers/       # Utility functions
│   ├── middlewares/   # Express middlewares
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic services
│   ├── types/         # TypeScript types
│   ├── utils/         # Additional utilities
│   ├── index.ts       # Entry point
│-- .env               # Environment variables
│-- .gitignore         # Git ignore file
│-- package.json       # Dependencies and scripts
│-- tsconfig.json      # TypeScript configuration
│-- README.md          # Project documentation
```

## Contribution

If you want to contribute:
1. Fork the repository.
2. Create a branch (`feature/new-feature`).
3. Make changes and submit a pull request.

## License
This project is licensed under Juan Laspiur.

