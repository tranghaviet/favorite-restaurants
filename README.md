1.  **Database Setup:**

    *   Ensure you have Docker installed.
    *   Navigate to the directory containing the `docker-compose.yml` file.
    *   Run `docker-compose up -d` to start the PostgreSQL database. This sets up a database named "restaurant" with the user "postgres" and password "postgres" accessible on port 5432.
    *   The `.env` file (if you have one) should contain the `DATABASE_URL` environment variable, which should point to your PostgreSQL database (e.g., `postgresql://postgres:postgres@localhost:5432/restaurant?schema=public`).

2.  **Project Setup:**

    *   Install the dependencies: `pnpm install`.

3.  **Prisma Setup and Run the server:**

    *   Run `pnpm prisma migrate dev` to create the database tables based on the `prisma/schema.prisma` file. If you make changes to the schema, run this command again to apply them.
    *   Run `pnpm run prisma:seed` to seed database sample data
    *   Run `pnpm prisma studio` to view the database in a visual editor.
    *   Run the server using the command `pnpm run dev`. The server listens on port 3000, as indicated by the `console.log` statement.

4.  **tRPC API Endpoints:**

    *   The backend exposes the following tRPC endpoints:

        *   `getRestaurants`: This is a `query` procedure that fetches all restaurants from the database using `prisma.restaurant.findMany()`. It returns an array of `Restaurant` objects.
        *   `addFavorite`: This is a `mutation` procedure that takes an object with an `id` property (string) as input. It updates the restaurant with the given `id` in the database, setting `isFavorite` to `true`. It returns the updated `Restaurant` object.
