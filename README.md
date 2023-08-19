# sURLs - Simple URL Shortener

A simple URL shortener written in Next.js and Postgres.

## Installation & Running
You can run sURLs in two ways: either by running it directly on your machine, or by running it in a Docker container. 

### Prerequisites
To run sURLs, you must have a PostgreSQL database in place for storing data. In the context of Docker, a database will be automatically bundled when employing the `common.yml` configuration. However, if you opt for `app.yml` (which solely dockerizes sURLs without including any databases), or if you run sURLs directly on your local machine, you will need to arrange for your own database.

Furthermore, you'll need a `.env` file to properly configure the database URL and the administrative password:
* If you're utilizing Docker, rename `.env.docker.example` to `.env.docker` and update both instances of `<password>` with your actual password (these can be anything if you opt for `common.yml`)
* If you're running sURLs locally, rename `env.example` to `.env` and replace the placeholders `<connection_url>` and `<password>` with your respective connection URL and password.

### Running on your machine

1. **Install dependencies:** 
   Run `npm install` to install all dependencies.

2. **Setup PostgreSQL Tables:** 
   Run the following command to set up the necessary tables in your PostgreSQL database:

   ```bash
   npm run setup_postgres
   ```

3. **Set output mode:**
   Set the `output` attribute inside `next.config.js` to `undefined`.

4. **Build the project:** 
   Run `npm run build` to build the project.

5. **Start the server:** 
   Run `npm start` to start the server.

6. **Access sURLs Service:** 
   You can now access the sURLs service at [http://localhost:3000](http://localhost:3000).

### Running in a Docker container

1. **Set output mode**
   Set the `output` attribute inside `next.config.js` to `standalone`.

2. **Build & Run Docker Container:** 
   You can start the Docker container using one of the following commands:
   - To launch sURLs along with a bundled Postgres database, use:
   ```bash
   docker compose -f common.yml up -d
   ```

   - If you want to run only sURLs without the bundled database, use:
   ```bash
   docker compose -f app.yml up -d
   ```

3. **Access sURLs Service:** 
   With the container set up and migrations completed, you can now access the sURLs service at [http://localhost:3000](http://localhost:3000).

### Development

Do step 1-5 of "[Running on your machine](#Running-on-your-machine)" but do `npm run setup_postgres_dev` instead on step 3, then run `npm run dev` to start the development server. 

## Admin page

sURLs allows you to edit or remove your URLS in the `/admin` page. However, to
hinder unauthenticated access, authentication has been added by means of a
password. To set it, edit the `AUTHENTICATION_PASSWORD` in your env file. 

## Configuration

You can configure sURLs by going to `config.ts` in the `src` directory. Options
include (among others):

- `custom_id_regex`: A regex which the custom ID has to match. Default
  `^[a-zA-Z0-9_-]+$`.
- `id_length`: The length of the custom ID. Default `5`.

