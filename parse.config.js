const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const config = {
  databaseURI: databaseUri || 'postgres://postgres:stratpoint@localhost:5432/blogium',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  allowClientClassCreation: process.env.CLIENT_CLASS_CREATION || false,
  // graphQLServerURL: process.env.GRAPHQL_SERVER_URL || 'http://localhost:1337/graphql',
  // liveQuery: {
  //   classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  // },

  /* Email Verification */
  // verifyUserEmails: true,
  // publicServerURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  // appName: process.env.APP_NAME || 'Blogium',
  // emailAdapter: {
  //   module: 'parse-server-simple-mailgun-adapter',
  //   options: {
  //     fromAddress: process.env.EMAIL_FROM || 'test@gmail.com',
  //     domain: process.env.MAILGUN_DOMAIN || 'gmail.com',
  //     apiKey: process.env.MAILGUN_API_KEY || 'apiKey',
  //   },
  // },

  /* File Storage */
  filesAdapter: {
    module: '@parse/s3-files-adapter',
    options: {
      bucket: process.env.S3_BUCKET_NAME || 'myBucket',
      // optional:
      region: 'us-west-2', // default value
      bucketPrefix: '', // default value
      directAccess: false, // default value
      fileAcl: null, // default value
      baseUrl: null, // default value
      baseUrlDirect: false, // default value
      signatureVersion: 'v4', // default value
      globalCacheControl: null, // default value. Or 'public, max-age=86400' for 24 hrs Cache-Control
      ServerSideEncryption: 'AES256|aws:kms', //AES256 or aws:kms, or if you do not pass this, encryption won't be done
      validateFilename: null, // Default to parse-server FilesAdapter::validateFilename.
      generateKey: null, // Will default to Parse.FilesController.preserveFileName
      s3overrides: {
        accessKeyId: process.env.S3_AWS_KEY,
        secretAccessKey: process.env.S3_AWS_SECRET,
        ...(process.env.S3_ENV === 'development' && {
          endpoint: 'localhost:4566',
          sslEnabled: false,
          s3ForcePathStyle: true,
        }),
      },
    },
  },
  maxUploadSize: '2MB',
};

console.log(config);

module.exports = {
  config,
};
