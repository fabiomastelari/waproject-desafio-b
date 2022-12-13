# WA Project - Desafio B - Fábio Mastelari: APP
To setup this APP, first you will need:
- Running API
- Node.js version 12.22.12 installed (will not work with another version - I have obligated to use this version due to restrictions of the shared server that I have access to host the API)
- Yarn package manager installed globally
With these pre-requisites fulfilled:
1. Copy ./.env.sample to ./.env.local if local or ./.env if production
2. Properly replace the following values in copied .env file:
   - `<node_env>` to 'dev' if local 'production' if production
   - `<app_port>` to the port number that APP will run
   - `<disabled_auth0>` to 1 if you are using an not secured API or 0 otherwise
   - `<auth0_client_id>` to the auth0 application client id
   - `<auth0_client_secret>` to the auth0 application client secret
   - `<auth0_audience>` to the auth0 application audience
   - `<auth0_subdomain>` to the auth0 application subdomain
   - `<auth0_region>` to the auth0 application region code
3. Install dependencies:
   - Execute `yarn install`
4. To run:
   1. Locally: 
      - Execute `yarn dev`
   2. In production:
      - Execute `yarn build`
      - Execute `yarn start`
