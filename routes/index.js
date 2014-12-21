var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var credentials = require('../credentials');
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: credentials.key,
  secretAccessKey: credentials.secret
});
var s3 = new AWS.S3();

function getImages(callback) {
  var params = {
    Bucket : credentials.bucket,
    Prefix : moment().utc().format('MM-DD-YYYY_h:mm') // my pi stores files in utc format
  };

  s3.listObjects(params, function(err, data) {
    var imageNames = [];
    _.each(data.Contents, function(image) {
      imageNames.push(image.Key);
    });

    imageNames.reverse();
    callback(imageNames);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  getImages(function(images) {
    res.render(
      'index',
      {
        title: 'Raspberry Pi Image Gallery',
        images: images,
        bucket: credentials.bucket
      }
    );
  });
});

module.exports = router;
