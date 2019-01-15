#!/bin/bash

yarn db:migrate
yarn db:seed

nodemon src/app.ts
