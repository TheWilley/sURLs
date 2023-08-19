# sURLs - Simple URL Shortener

A simple URL shortener written in Next.js and Postgres.

## Installation & Running
You can run sURLs in two ways: either by running it directly on your machine, or by running it in a Docker container. 

### Prerequisites
To run sURLs, you must have a PostgreSQL database in place for storing data. In the context of Docker, a database will be automatically bundled when employing the `docker/common.yml` configuration. However, if you opt for `docker/app.yml` (which solely dockerizes sURLs without including any databases), or if you run sURLs directly on your local machine, you will need to arrange for your own database. In the former case, make sure the database is already running before setup.

To ensure proper configuration of the database URL and the administrative password for the /admin page, you will also need a `.env` file. Here are the instructions for different scenarios:

   * Running on Docker:
      * If you opt for `docker/common.yml`, duplicate `docker/.env.docker.common.example`, then rename the copy to `.env.docker.common`. Afterward, modify the values for the `POSTGRES_PASSWORD` and `AUTHENTICATION_PASSWORD` properties as desired.
      * If you opt for `docker/app.yml`, replicate `docker/.env.docker.app.example`, then change the name to `.env.docker.app`. Update the `POSTGRES_URL` property to match the details of your external database. Also, set the `AUTHENTICATION_PASSWORD` property to your preferred password.

   * Running locally:
     * Duplicate `env.example` and name the duplicate as `.env`. Then, replace the values of the `POSTGRES_URL` property to match the details of your external database. Also, set the `AUTHENTICATION_PASSWORD` property to your preferred password.

### Local Setup

1. **Build & Run Project** 
   Run `npm run quick_start` to automatically setup and run the project.

2. **Access sURLs Service:** 
   Access the sURLs service at [http://localhost:3000](http://localhost:3000).

### Docker Setup

1. **Build & Run Project:** 
   You can start the Docker container using one of the following commands:
   - To launch sURLs along with a bundled Postgres database, cd into the root folder, then use:
   ```bash
   docker compose -f ./docker/common.yml up -d
   ```

   - If you want to run only sURLs without the bundled database:
   ```bash
   docker compose -f ./docker/app.yml up -d
   ```

2. **Access sURLs Service:** 
     Access the sURLs service at [http://localhost:3000](http://localhost:3000).

### Development

1. `npm run setup`
2. `npm run dev`


## Admin page

sURLs allows you to edit or remove your URLS in the `/admin` page. However, to
hinder unauthenticated access, authentication has been added by means of a
password. To set it, edit the `AUTHENTICATION_PASSWORD` property in your env file. 

## Configuration

You can configure sURLs by going to `config.ts` in the `src` directory. Options
include:

- `custom_id_regex`: A regex which the custom ID has to match. Default
  `^[a-zA-Z0-9_-]+$`.
- `id_length`: The length of the generated and custom IDs. Default `5`.

