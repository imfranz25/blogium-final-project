/* Route Imports */
const authRoute = require('./auth.route');
const blogRoute = require('./blog.route');

/* Error Handlers */
const { errorControllers } = require('../controllers');
const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
let errorHandler;

/* Error handlers -> Based on the node environment */
if (NODE_ENV === 'DEVELOPMENT' || NODE_ENV === 'TEST') {
  errorHandler = errorControllers.developmentErrorsHandler;
} else {
  errorHandler = errorControllers.productionErrorHandler;
}

/* Use all imported routes with app (express) */
const useRoutes = (app) => {
  app.use(authRoute);
  app.use(blogRoute);
  app.use('*', errorControllers.pageNotFound);
  app.use(errorHandler);
};

module.exports = useRoutes;
