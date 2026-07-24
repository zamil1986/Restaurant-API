<div align="center">

# Restaurant API

A RESTful API for managing restaurant menu data, built with Express, TypeScript, Bun, Prisma ORM, and MySQL/MariaDB.

</div>

## Overview

Restaurant API is a backend project that provides CRUD operations for restaurant food and drink data.

The project separates HTTP handling, business logic, and database access into different layers. This makes the code easier to understand, maintain, test, and develop further.

## Features

- Get all foods
- Get a food by ID
- Create a new food
- Replace food data using `PUT`
- Partially update food data using `PATCH`
- Delete a food
- Validate food names, prices, and IDs
- Get all drinks and individual drinks by ID
- Create, replace, partially update, and delete drinks
- Validate drink names, prices, and IDs
- Store data in MySQL/MariaDB using Prisma ORM
- Modular Controller–Service–Repository architecture

## Tech Stack

- [Bun](https://bun.sh/) — JavaScript runtime and package manager
- [TypeScript](https://www.typescriptlang.org/) — statically typed JavaScript
- [Express](https://expressjs.com/) — backend web framework
- [Prisma ORM](https://www.prisma.io/) — database ORM and schema management
- [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) — relational database

## Architecture

```text
HTTP Request
     |
     v
Controller
     |
     v
Service
     |
     v
Repository
     |
     v
Prisma ORM
     |
     v
MySQL / MariaDB
```

Each layer has a different responsibility:

- **Controller** receives HTTP requests and returns HTTP responses.
- **Service** contains validation and business rules.
- **Repository** performs database operations through Prisma.
- **Prisma ORM** converts application operations into database queries.

## Project Structure

```text
Restaurant-API/
├── prisma.config.ts
├── prisma/
│   ├── db.ts
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── drinks/
│   │   ├── drink.controller.ts
│   │   ├── drink.service.ts
│   │   └── drink.repository.ts
│   └── foods/
│       ├── food.controller.ts
│       ├── food.service.ts
│       └── food.repository.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following software before running the project:

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)
- MySQL or MariaDB

### 1. Clone the repository

```bash
git clone https://github.com/zamil1986/Restaurant-API.git
cd Restaurant-API
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000

DATABASE_URL="mysql://root:your_password@localhost:3306/restaurant_db"

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
```

Replace the example values with your actual database credentials.

> Never commit the `.env` file because it may contain sensitive information such as database usernames and passwords.

### 4. Generate the Prisma Client

```bash
bunx prisma generate --schema prisma/schema.prisma
```

### 5. Synchronize the database schema

```bash
bunx prisma db push --schema prisma/schema.prisma
```

This command creates or updates the database tables based on the Prisma schema.

### 6. Run the application

```bash
bun run src/app.ts
```

The server will run at:

```text
http://localhost:3000
```

The actual port depends on the `PORT` value inside your `.env` file.

## API Endpoints

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check whether the API is running |
| `GET` | `/foods` | Get all foods |
| `GET` | `/foods/:id` | Get a food by ID |
| `POST` | `/foods` | Create a new food |
| `PUT` | `/foods/:id` | Replace the food name and price |
| `PATCH` | `/foods/:id` | Update selected food fields |
| `DELETE` | `/foods/:id` | Delete a food |
| `GET` | `/drinks` | Get all drinks |
| `GET` | `/drinks/:id` | Get a drink by ID |
| `POST` | `/drinks` | Create a new drink |
| `PUT` | `/drinks/:id` | Replace the drink name and price |
| `PATCH` | `/drinks/:id` | Update selected drink fields |
| `DELETE` | `/drinks/:id` | Delete a drink |

## Request Examples

### Get all foods

```http
GET /foods
```

Example response:

```json
[
  {
    "id_food": 1,
    "food_name": "Fried Rice",
    "price": 25000
  }
]
```

### Get a food by ID

```http
GET /foods/1
```

Example response:

```json
{
  "id_food": 1,
  "food_name": "Fried Rice",
  "price": 25000
}
```

### Create a food

```http
POST /foods
Content-Type: application/json
```

Request body:

```json
{
  "name": "Fried Rice",
  "price": 25000
}
```

Example response:

```json
{
  "result": {
    "id_food": 1,
    "food_name": "Fried Rice",
    "price": 25000
  }
}
```

### Replace a food

Both `name` and `price` must be provided when using `PUT`.

```http
PUT /foods/1
Content-Type: application/json
```

Request body:

```json
{
  "name": "Special Fried Rice",
  "price": 30000
}
```

### Partially update a food

Use `PATCH` when only some fields need to be changed.

```http
PATCH /foods/1
Content-Type: application/json
```

Update only the price:

```json
{
  "price": 28000
}
```

Update only the name:

```json
{
  "name": "Chicken Fried Rice"
}
```

### Delete a food

```http
DELETE /foods/1
```

### Create a drink

```http
POST /drinks
Content-Type: application/json
```

Request body:

```json
{
  "name": "Iced Tea",
  "price": 10000
}
```

Example response:

```json
{
  "result": {
    "id_drink": 1,
    "drink_name": "Iced Tea",
    "price": 10000
  }
}
```

The other drink operations follow the same request pattern as foods using
`GET`, `PUT`, `PATCH`, and `DELETE` on `/drinks` or `/drinks/:id`.

## Validation Rules

The application currently applies the following rules:

- An ID must be a positive number.
- A food or drink name cannot be empty.
- A price must be a number.
- A price must be greater than zero.
- `POST` requires both `name` and `price`.
- `PUT` requires both `name` and `price`.
- `PATCH` accepts `name`, `price`, or both.

Example validation error:

```json
{
  "message": "Invalid price"
}
```

## Database Models

### Food

| Field | Type | Description |
|---|---|---|
| `id_food` | Integer | Primary key with auto-increment |
| `food_name` | String | Name of the food |
| `price` | Integer | Price of the food |

### Drink

| Field | Type | Description |
|---|---|---|
| `id_drink` | Integer | Primary key with auto-increment |
| `drink_name` | String | Name of the drink |
| `price` | Integer | Price of the drink |

## Testing the API

You can test the API using:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Bruno](https://www.usebruno.com/)
- `curl`

Example with `curl`:

```bash
curl http://localhost:3000/foods
```

Get all drinks using `curl`:

```bash
curl http://localhost:3000/drinks
```

Create a food using `curl`:

```bash
curl -X POST http://localhost:3000/foods \
  -H "Content-Type: application/json" \
  -d '{"name":"Fried Rice","price":25000}'
```

Create a drink using `curl`:

```bash
curl -X POST http://localhost:3000/drinks \
  -H "Content-Type: application/json" \
  -d '{"name":"Iced Tea","price":10000}'
```

## Roadmap

Future improvements planned for this project:

- [x] Add CRUD endpoints for drinks
- [ ] Add centralized error-handling middleware
- [ ] Add schema-based request validation
- [ ] Add automated unit and integration tests
- [ ] Add authentication and authorization
- [ ] Add pagination, filtering, and search
- [ ] Add OpenAPI/Swagger documentation
- [ ] Add deployment configuration

## Author

**Muhammad Zamil**

- GitHub: [@zamil1986](https://github.com/zamil1986)

## License

No license has been added to this project yet.
