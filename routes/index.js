/* Route Imports */
const authRoute = require('./auth.route');

/* Use all imported routes with app (express) */
const useRoutes = (app) => {
  app.use(authRoute);
};

module.exports = useRoutes;
