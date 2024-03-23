import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import asteroidsRoutes from './routes/meteors';
import marsRoverPhotosRoutes from './routes/photos';
import { errorHandler, notFoundHandler } from './ErrorHandlingMiddlewares/errorHandler';
import path from 'path';

const { PORT } = process.env;
const app = express();

dotenv.config({ path: './.env' });

app.use(express.static(path.join(__dirname, 'public'))); // styles

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure(path.join(__dirname, 'views'), {
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

app.listen(parseInt(PORT ?? '3000'), 'localhost', () => {
  console.log(`Express app is running on port: ${PORT}`);
});
