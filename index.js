// Example express application adding the parse-server module to expose Parse
// compatible API routes.
require('dotenv').config();
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));
const { config } = require('./parse.config');

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

if (!test) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const api = new ParseServer(config);

  app.use(mountPath, api);
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
  const port = process.env.PORT || 1337;
  const httpServer = require('http').createServer(app);

  httpServer.listen(port, function () {
    console.log('Blogium API is running on port ' + port + '.');
  });

  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
