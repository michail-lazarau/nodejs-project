import { Express } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';

export const registerViewEngine = (app: Express) => {
  function register() {
    app.engine('html', nunjucks.render);
    app.set('view engine', 'html');

    nunjucks.configure(path.join(__dirname, 'views'), {
      autoescape: false,
      express: app,
    });
  }

  register();
};
