# API Backend

This folder contains a simple Express backend connected to PostgreSQL. It exposes a single endpoint to create users.

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

When the server starts, it will automatically create a `users` table if it does not already exist.
