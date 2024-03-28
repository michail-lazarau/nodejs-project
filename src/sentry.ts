import { Express } from 'express';
import * as sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { environment } from './config/environment';

export const initSentry = (app: Express) => {
  function registerMiddlewares() {
    app.use(sentry.Handlers.requestHandler());
    app.use(sentry.Handlers.tracingHandler());
  }

  function init() {
    sentry.init({
      dsn: environment.sentry.dns,
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
