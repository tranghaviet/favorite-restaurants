1.  **Database Setup:**

    *   Ensure you have Docker installed.
    *   Navigate to the directory containing the `docker-compose.yml` file.
    *   Run `docker-compose up -d` to start the PostgreSQL database. This sets up a database named "restaurant" with the user "postgres" and password "postgres" accessible on port 5432.
    *   The `.env` file (if you have one) should contain the `DATABASE_URL` environment variable, which should point to your PostgreSQL database (e.g., `postgresql://postgres:postgres@localhost:5432/restaurant?schema=public`).

2.  **Project Setup:**

Workflow for Setting Up a Full Project:

Initial Setup:
- pnpm install: Install dependencies.
- pnpm migrate dev: Create the initial migration and apply it.
- pnpm db-seed: seed the database with initial data.
- pnpm generate: generate the prisma client.
Development:
- pnpm dev: Start the development server with database migrations and seeding.
- pnpm prisma-studio: To view and edit the database.
Make changes to your schema.prisma file.
- pnpm migrate dev: Create and apply new migrations.
Modify your seed script (prisma/seed.js or prisma/seed.ts) and run `pnpm db-seed`to update seed data.
Production Deployment:
- pnpm build: Build the application.
- pnpm migrate deploy: Apply migrations to your production database.
- pnpm start: Start the production server.

3.  **tRPC API Endpoints:**

    *   The backend exposes the following tRPC endpoints:

        *   `getRestaurants`: This is a `query` procedure that fetches all restaurants from the database using `prisma.restaurant.findMany()`. It returns an array of `Restaurant` objects.
        *   `addFavorite`: This is a `mutation` procedure that takes an object with an `id` property (string) as input. It updates the restaurant with the given `id` in the database, setting `isFavorite` to `true`. It returns the updated `Restaurant` object.
