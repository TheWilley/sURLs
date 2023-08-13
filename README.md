# sURLs - Simple URL shortener
A very simple URL shortener written in Next.js and SQLite.

## Installation & Running
First clone this repo, then run `npm install` to install all dependencies. At this point you need to choose which database you want to use. The currently supported ones are *sqlite* and *postgres*.

### SQLite
Simply run `npm run setup_sqlite` and you're done.

### Postgres
Create a database which you want to use for sURLs. Then create a `.env` file in the root directory of this project and add the following lines:
```env
POSTGRES_URL=postgres://<username>:<password>@<host>:<port>/<database>
```
Replace the placeholders with your actual database credentials. Then run `npm run setup_postgres`.

### Running
Run `npm run build` to build the project. Then run `npm start` to start the server.

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