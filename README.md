# sURLs - Simple URL shortener

A simple URL shortener written in Next.js and Postgres.

## Installation & Running
You can run sURLs in two ways: either by running it directly on your machine, or by running it in a Docker container. 

### Prerequisites
You'll need a PostgreSQL database for storing sURLs. If you don't have one already, create a new database or use an existing one. Make sure you have your database credentials ready.

You will also need a `.env` file to configure the database url and admin password. Rename `.env.example` to `.env` or create a `.env` file in the root directory of the project and add the following lines:
```env
POSTGRES_URL=postgres://<username>:<password>@<host>:<port>/<database>
AUTHENTICATION_PASSWORD=<password>
```

* `POSTGRES_URL` — Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your database credentials. 
* `AUTHENTICATION_PASSWORD` — Replace `<password>` with a password of your choice. This password will be used to authenticate you when you want to edit or remove your URLs.

### Running on your machine

1. **Clone the Repository:** 
   Begin by cloning the repository to your local machine.

2. **Install dependencies:** 
   Run `npm install` to install all dependencies.

   * `POSTGRES_URL` — Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your database credentials. 
   * `AUTHENTICATION_PASSWORD` — Replace `<password>` with a password of your choice. This password will be used to authenticate you when you want to edit or remove your URLs. 

3. **Setup PostgreSQL Tables:** 
   Run the following command to set up the necessary tables in your PostgreSQL database:

   ```bash
   npm run setup_postgres
   ```

4. **Set output mode**
   Set the `output` attribute inside `next.config.js` to `undefined`.

5. **Build the project:** 
   Run `npm run build` to build the project.

6. **Start the server:** 
   Run `npm start` to start the server.

### Running in a Docker container

1. **Configure Container Port (Optional):** 
   By default, the container will be available on port `3000`. If you want to use a different port, modify the `docker-compose.yml` file. Change the first value in the `ports` option (e.g., `3000:3000` to `8080:3000` for port `8080`).

2. **Set output mode**
   Set the `output` attribute inside `next.config.js` to `standalone`.
   
3. **Build Docker Image:** 
   Build the Docker image by running the following command:

   ```bash
   docker compose build
   ```

4. **Run Docker Container:** 
   Run the Docker container using either of the following commands:
   - To run the container in the foreground:
   ```bash
   docker compose up
   ```

   - To run the container in the background:
   ```bash
   docker compose up -d
   ```

5. **Run Prisma Migrations:** 
   If hosting locally, access the command line interface (CLI) of the container by running:

   ```bash
   docker exec -it surls-container /bin/sh
   ```

   Inside the container CLI, execute the following command to run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

   If prompted to install Prisma, press `y` and wait for the installation to complete. Ignore any errors about already migrated databases. Exit the CLI afterward by running:

   ```bash
   exit
   ```

   If hosting on a server such as Azure or docker hub, access the CLI of the container trough it and run the same commands to migrate prisma.

6. **Access sURLs Service:** 
   With the container set up and migrations completed, you can now access the sURLs service using the port you specified.

### Development

Do step 1-5 of "[Running on your machine](#Running-on-your-machine)", then run `npm run dev` to start the development server.

## Authentication

sURLs allows you to edit or remove your URLS in the `/admin` page. However, to
hinder unauthenticated access, authentication has been added by means of a
password. To set it, edit the following line in the `.env` file in the root directory of this project:
```env
AUTHENTICATION_PASSWORD=<password>
```

## Configuration

You can configure sURLs by going to `config.ts` in the `src` directory. Options
include (among others):

- `custom_id_regex`: A regex which the custom ID has to match. Defaults to
  `^[a-zA-Z0-9_-]+$`.
- `custom_id_length`: The length of the custom ID. Defaults to `5`.
- `generated_id_length`: The length of the generated ID. Defaults to `5`.
