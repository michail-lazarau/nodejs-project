import environment from './config/environment';
import express, { Request, Response, NextFunction } from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import asteroidsRoutes from './routes/meteors';
import marsRoverPhotosRoutes from './routes/photos';
import { errorHandler, notFoundHandler } from './ErrorHandlingMiddlewares/errorHandler';
import path from 'path';
import { fileURLToPath } from 'node:url';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, 'public'))); // styles

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: false,
  express: app,
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});

app.use(asteroidsRoutes);

app.use(marsRoverPhotosRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(parseInt(environment.port ?? '3000'), 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log(`Express app is running on port: ${environment.port}`);
});
