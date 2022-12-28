// Example express application adding the parse-server module to expose Parse
// compatible API routes.
require('dotenv').config();
const express = require('express');
const { ParseServer } = require('parse-server');
const path = require('path');
const cors = require('cors');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));
const { config } = require('./parse.config');

const app = express();
const port = process.env.PORT || 1337;

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(cors());

// This will enable Parse Dashboard on your dev env
if (process.env.NODE_ENV === 'development' && !test) {
  const ParseDashboard = require('parse-dashboard');
  const users = [
    {
      user: 'admin',
      pass: '$2y$12$zkMYmegpI00X2NmNBKHiEuujT6xl7AKWpO/Lx.3d2Gq2K2RBeulzi',
    },
  ];

  app.use(
    '/dashboard',
    new ParseDashboard(
      {
        allowInsecureHTTP: true,
        trustProxy: 1,
        apps: [
          {
            serverURL: config.serverURL,
            graphQLServerURL: config.graphQLServerURL,
            appId: config.appId,
            masterKey: config.masterKey,
            appName: 'blogium-parse-server',
          },
        ],
        users,
        useEncryptedPasswords: true,
      },
      true
    )
  );
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (_req, res) {
  res.status(200).send('Blogium API - Parse Server Version');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (_req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

if (!test) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const api = new ParseServer(config);

  app.use(mountPath, api);

  const httpServer = require('http').createServer(app);

  httpServer.listen(port, function () {
    console.log('Blogium API is running on port ' + port + '.');
  });

  // const parseGraphQLServer = new ParseGraphQLServer(api, {
  //   graphQLPath: '/graphql',
  // });
  // parseGraphQLServer.applyGraphQL(app);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Parse Dashboard Running on http://localhost:${port}/dashboard.`);
  }

  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
