const AWS = require('aws-sdk');

AWS.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
};

AWS.config.region = 'eu-west-1';

module.exports = new AWS.S3();
