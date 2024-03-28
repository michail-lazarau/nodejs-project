import { environment } from './config/environment';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import asteroidsRoutes from './routes/meteors';
import marsRoverPhotosRoutes from './routes/photos';
import { errorHandler, notFoundHandler } from './ErrorHandlingMiddlewares/errorHandler';
import path from 'path';
import { initSentry, sentryErrorHandler } from './sentry';
import { registerViewEngine } from './viewEngine';

const app = express();
initSentry(app);
registerViewEngine(app);

app.use(express.static(path.join(__dirname, 'public'))); // styles

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});

app.use(sentryErrorHandler);

app.use(asteroidsRoutes);

app.use(marsRoverPhotosRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(parseInt(environment.port ?? '3000'), 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log(`Express app is running on port: ${environment.port}`);
});
