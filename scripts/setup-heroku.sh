#!/bin/bash

wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_LOGIN_NAME
  password $HEROKU_API_KEY
machine git.heroku.com
  login $HEROKU_LOGIN_NAME
  password $HEROKU_API_KEY
EOF

heroku git:remote --remote heroku-production -a koa-api
