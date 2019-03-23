# Koa 2 Typescript API
- Heroku
- CircleCI
- KOA2
- Typescript
- Docker
- Knex
- Postgres
- JWT Auth
- Mocha
- Supertest
- Chai

## Configuring
- first you need to run `cp .env.exampl .env`
- next run `yarn`

## Running Locally
- make sure you have docker installed
- run `yarn dev:docker`

## Running Tests
- make sure you have docker installed
- run `yarn test:docker`

## Running Lint
- run `yarn lint`

## Running Prettier
- run `yarn format`

## Configuring Heroku
- Login to your Heroku account and create and app and pipeline for your project.
- Add a `Heroku Postgres` db to your app.
- Under the `deploy` tab, Link up your github repo for the app and enable automatic deploys.
- Under the `settings` tab open the `environment variables`. The `app.json` file in the project defines
what variables are required by your app. Some of them should be set to the following:
```
DB_POOL_MAX = 5
DB_POOL_MIN = 2
NODE_ENV = production
PGSSLMODE = require
```

## Configuring Continuous Delivery
This app is setup so CircleCI deploys to production if all tests passs. To allow this, you need to do some configuration to the `scripts/setup-heroku.sh`. Once you have setup your heroku app you need to update the `scripts/setup-heroku.sh` file and replace `koa-api` with whatever your app is named in heroku.

On `CircleCI` you need to also setup some environment variables: 
`HEROKU_LOGIN_NAME`: the login email for your heroku account
`HEROKU_API_KEY`: the api key you get from heroku to allow circleci access
