import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';

import config from './config';
import tasksRoute from './routes/secrets.route';
import errorMiddleware from './middlewares/error.middleware';
import corsMiddleware from './middlewares/cors.middleware';

const { server } = config;

export const initializeServer = () => {
  const app = new Koa();

  // Middlewares
  app.use(corsMiddleware());
  app.use(json());
  app.use(logger());
  app.use(errorMiddleware());

  // Routes
  const router = new Router({ prefix: `/api/v${server.apiVersion}` });
  router.use(tasksRoute.routes());
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(server.port, () => {
    console.log(`Server started at port ${server.port}`);
  });
};
