const awsServerlessExpress = require('aws-serverless-express');
const app = require('../../../backend/express-server/index'); // Path to your Express app
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
}; 