# Yolo NestJS Mongo POC

## Requirements

Concepts Implementation Requirements:

- API Throttling
- Rate Limiter
- Middleware
- Interceptor

Features Needed:

- User Authentication
- User Authorization
- Articles CRUD Endpoint
- Structured Response States(Both Error and Success)
- Github Actions Integration

## Installation

```bash
$ npm install
```

## Running the app

1. Copy `.env.example` to `.env` file.
2. Replace `MONGO_DB_URL` inside `.env` file with any mongodb database url.
3. You will find endpoints list to try out:

| Endpoint                        | Request Headers | Request Body            | Description                                                                            |
| ------------------------------- | --------------- | ----------------------- | -------------------------------------------------------------------------------------- |
| POST /v1/accounts               | None            | email, password         | Authenticates and returns a JWT Token, which will later be set as Authorization Header |
| POST /v1/accounts/new           | None            | email, password         | Authenticates and returns a JWT Token.                                                 |
| GET /v1/articles                | Authorization   | None                    | Returns a list of articles                                                             |
| POST /v1/articles               | Authorization   | Article details         | Returns a list of articles                                                             |
| PUT /v1/articles/               | Authorization   | Article Details with ID | Returns a list of articles                                                             |
| DELETE /v1/articles/:article-id | Authorization   | None                    | deletes an article with provided id                                                    |

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
