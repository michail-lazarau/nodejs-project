import { Express } from 'express';
import * as sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export const initSentry = (app: Express) => {
  function registerMiddlewares() {
    app.use(sentry.Handlers.requestHandler());
    app.use(sentry.Handlers.tracingHandler());
  }

  function init() {
    sentry.init({
      dsn: 'https://e825bf53877af05e2387390703cf4433@o4506988735823872.ingest.us.sentry.io/4506988738772992',
      integrations: [
        new sentry.Integrations.Http({ tracing: true }),
        new sentry.Integrations.Express({ app: app }),
        nodeProfilingIntegration(),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });

    registerMiddlewares();
  }

  init();
};

export const sentryErrorHandler = sentry.Handlers.errorHandler();
