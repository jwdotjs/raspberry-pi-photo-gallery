var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var credentials = require('../credentials'); // AWS bucket, key, and secret

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: credentials.key,
  secretAccessKey: credentials.secret
});
var s3 = new AWS.S3();

function getLatestImage(callback) {
  var params = {
    Bucket : credentials.bucket,
    Prefix : moment().utc().format('YYYY-MM-DDTHH') // my pi stores files in utc format ISO-8601
  };

  s3.listObjects(params, function(err, data) {
    var imageNames = [];
    _.each(data.Contents, function(image) {
      imageNames.push(image.Key);
    });

    var newest = imageNames.pop();
    callback(newest);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  getLatestImage(function(image) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      image : image,
      bucket : credentials.bucket
    }));
  });
});

module.exports = router;
