# API Backend

This folder contains a simple Express backend connected to PostgreSQL using Sequelize. It exposes an endpoint to create `Asociado` records.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Provide a `DATABASE_URL` environment variable pointing to your PostgreSQL instance. You can also set `PORT` to change the listening port (defaults to `3001`).

3. Start the server:
   ```bash
   npm start
   ```

When the server starts it will sync the Sequelize models and create the `asociados` table if it does not exist.

## Crear un asociado

Send a `POST` request to `/api/asociado` with a JSON body containing at least `nombre`, `apellido` and `email`. Example using cURL:

```bash
curl -X POST http://localhost:3001/api/asociado \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","apellido":"Perez","email":"juan@test.com"}'
```

You can also test the endpoint using Postman by sending a similar request.
