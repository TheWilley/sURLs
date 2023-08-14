# sURLs - Simple URL shortener
A simple URL shortener written in Next.js and utilizing Postgres.

## Installation & Running
First clone this repo, then run `npm install` to install all dependencies. At this point you need to create or use a postgres database which you want to use for sURLs. Then create a `.env` file in the root directory of this project and add the following lines:
```env
POSTGRES_URL=postgres://<username>:<password>@<host>:<port>/<database>
```
Replace the placeholders with your actual database credentials. Then run `npm run setup_postgres`.

### Running
Run `npm run build` to build the project. Then run `npm start` to start the server.

### Docker
sURLs can also be run in a Docker container. To do so, first build the image by running `docker compose build`, then run the container by running `docker compose up` or `docker compose up -d` to run it in the background. The container will be available on port `3000` by default, but you can change this by editing the `docker-compose.yml` file by changing the first value in the `ports` option (i.e, `3000:3000` to `8080:3000` to run it on port `8080`).

After running the container, go into the CLI of the container by running `docker exec -it surls-container /bin/sh` and run `npx prisma migrate dev` to run the migrations. 
If you get asked to install prisma, press `y` and wait for it to finish. You may encounter an error if the database already have been migrated, but this can be ignored.
Then run `exit` to exit the CLI. You can now access sURLs on the port you specified earlier.

### Development
Run `npm run dev` to start the development server.

### Authentication
sURLs allows you to edit or remove your URLS in the `/admin` page. However, to hinder unauthenticated access, authentication has been added by means of a password. To set it, create a `.env` file in the root directory of this project and add the following lines:
```env
AUTHENTICATION_PASSWORD=<password>
```

## Configuration
You can configure sURLs by going to `config.ts` in the `src` directory. Options include (among others):
- `custom_id_regex`: A regex which the custom ID has to match. Defaults to `^[a-zA-Z0-9_-]+$`.
- `custom_id_length`: The length of the custom ID. Defaults to `5`.
- `generated_id_length`: The length of the generated ID. Defaults to `5`.

