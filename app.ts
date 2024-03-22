import dotenv from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import asteroidsRoutes from './src/routes/meteors.ts';
import marsRoverPhotosRoutes from './src/routes/photos.ts';
import { errorHandler, notFoundHandler } from './src/ErrorHandlingMiddlewares/errorHandler';
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  // res.setHeader('Access-Control-Allow-Header', 'Content-Type,  application/json')
  next();
});

app.use(asteroidsRoutes);

app.use(marsRoverPhotosRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const server = app.listen(parseInt(PORT), 'localhost', () => {
  const { port } = server.address();
  console.log(`Express app is running on port: ${port}`); // IPv6
});
