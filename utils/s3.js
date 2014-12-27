'use strict';

var credentials = require('../credentials'); // AWS bucket, key, and secret

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: credentials.key,
  secretAccessKey: credentials.secret
});

var s3 = new AWS.S3();

module.exports = s3;