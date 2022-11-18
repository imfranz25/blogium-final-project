/* Route Imports */
const authRoute = require('./auth.route');

/* Error Handlers */
const { errorControllers } = require('../controllers');
let errorHandler;

/* Error handlers -> Based on the environment */
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  errorHandler = errorControllers.developmentErrorsHandler;
} else {
  errorHandler = errorControllers.productionErrorHandler;
}

/* Use all imported routes with app (express) */
const useRoutes = (app) => {
  app.use(authRoute);
  app.use('*', errorControllers.pageNotFound);
  app.use(errorHandler);
};

module.exports = useRoutes;
