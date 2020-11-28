import * as Koa from 'koa';
import * as Router from 'koa-router';

const welcomeRouter = new Router();
welcomeRouter.get('/', (ctx: Koa.Context) => {
  ctx.body = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>API</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="robots" content="noindex,nofollow">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    </head>
    <body>
      <h1 style="text-align: center;">API</h1>
    </body>
  </html>`;
});

export { welcomeRouter };
