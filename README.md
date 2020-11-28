# Koa 2 Typescript API on HEROKU

- KOA2
- Typescript
- TypeORM
- Postgres
- JWT Auth via JWKS
- Rollbar
- Jest
- Prettier
- ESLint
- Supertest
- Heroku
- Github Actions

## Running The App Locally

- first you need to run `cp .env.example .env`
- Update your env with correct values
- next run `yarn`
- create a local postgres database called `example_api_test` and `example_api`
- run `yarn serve`

## Running Jest Tests

- `yarn test`
- `yarn test:coverage` // with test coverage

## Running ESLint

- `yarn lint`

## Running Prettier

- `yarn format`

## Configuring Heroku

- Login to your Heroku account and create and app and pipeline for your project.
- Add a `Heroku Postgres` db to your app.
- Under the `deploy` tab, Link up your github repo for the app and enable automatic deploys.
- Under the `settings` tab open the `environment variables`. The `app.json` file in the project defines
  what variables are required by your app. Some of them should be set to the following:

```
ADDITIONAL_ORIGINS
AUTH_AUDIENCE
AUTH_DOMAIN
AUTH_ISSUER
NODE_ENV='production'
ROLLBAR_ACCESS_TOKEN
ROLLBAR_ENVIRONMENT
```

## Configuring Rollbar

Create a rollbar account and get your tokens.
Create an env for `ROLLBAR_ACCESS_TOKEN` containing your token
Create an env for `ROLLBAR_ENVIRONMENT` containing your environment (production, staging, local. etc...)
If you want you can change what gets sent to rollbar by setting the env `ROLLBAR_LOG_LEVELS` it is a comma separated list of levels.

## Configuring Auth

Create an Auth0 account and then create an auth0 api.
Create an env `AUTH_ISSUER` which should be your issuer from your auth 0 api
Create an env `AUTH_AUDIENCE` which should be the audience from your auth 0 api
Create an env `AUTH_DOMAIN` which is the path to your auth0 jwks endpoint.

## Configuring CORS

You can add any origins you would like using the env `ADDITIONAL_ORIGINS`. This is comma separated.
You can also create dynamic domains using a regex by setting the `dynamicOrigins` variable in `src/middleware/corsRules.ts`

## Configuring TypeORM

The typeorm db is configured via the `ormconfig.js` file. You should mostly be able to leave this alone other than maybe renaming the db names.

## Configuring Continuous Delivery

This app is setup to use github Actions. There is a workflow file called `ci.yaml` in `.github/workflows`. You can configure `heroku` to deploy if the ci passes
