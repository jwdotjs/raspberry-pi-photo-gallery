'use strict';

var express = require('express');
var router = express.Router();

var credentials = require('../credentials');
var bucket = require('../utils/bucket');

function getLatestImage(callback) {
  bucket.getImagesWithinHour(function(imageNames) {
    imageNames.reverse();
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
