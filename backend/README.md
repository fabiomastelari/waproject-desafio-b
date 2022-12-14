# WA Project - Desafio B - Fábio Mastelari: API
To setup this API, first you will need:
- A MySQL server with a database previously created and it's access credentials
- Node.js version 12.22.12 installed (will not work with another version - I have obligated to use this version due to restrictions of the shared server that I have access to host the API)
- Yarn package manager installed globally
With these pre-requisites fulfilled:
1. Copy ./.env.sample to ./.env.local if local or ./.env if production
2. Properly replace the following values in copied .env file:
   - `<node_env>` to 'dev' if local 'production' if production
   - `<mysql_host>` to your MySQL server address (Usually '127.0.0.1' or 'localhost' if running in same machine)
   - `<mysql_port>` to your MySQL server address (Usually 3306)
   - `<mysql_user>` to your MySQL server database user
   - `<mysql_user_password>` to your MySQL server database user password
   - `<mysql_database_name>` to your MySQL database name
   - `<api_port>` to the port number that API will run
   - `<disable_auth0>` to 1 if you do not want to secure API or 0 otherwise
   - `<auth0_subdomain>` to the auth0 application subdomain
   - `<auth0_region>` to the auth0 application region code
   - `<auth0_app_audience>` to the auth0 application audience
   - `<auth0_app_cript_algorithm>` to the auth0 application cript algorithm
3. Install dependencies:
   - Execute `yarn install`
4. Prepare database:
   - Execute `yarn migration:run` to run all pending migrations and apply all needed changes on database (create/update tables, etc.)
5. To run:
   1. Locally: 
      - Execute `yarn dev`
   2. In production:
      - Execute `yarn build`
      - Execute `yarn start`
6. API Routes:
   - `GET /docs` API Swagger
   - `GET /movies?page={page_number}` return movies with pagination options - displays 10 movies by page
   - `GET /movies/{movie_id}` return information about the movie identificated by its id
   - `POST /movies/sync` synchronize api database with the first 50 movies returned from https://ghibliapi.herokuapp.com/#tag/Films
